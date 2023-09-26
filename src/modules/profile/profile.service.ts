import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../data/schemas/user.schema';
import { Model } from 'mongoose';
import {
  comparePassword,
  hashPassword,
} from '../../common/utils/paswordHashing.util';
import { ClientDto } from '../../data/dtos/client.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: any): Promise<UserDocument> {
    let passwordHash = null;

    if (user.password) {
      passwordHash = await hashPassword(user.password);
    }
    //if (user.email) {
    const lowerCaseEmail = user.email.toLowerCase();
    // }

    const userExist = await this.userModel.findOne({ email: lowerCaseEmail });
    if (userExist)
      throw new HttpException(
        'An account with this email already exists.',
        HttpStatus.UNAUTHORIZED,
      );
    const newUser = new this.userModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: lowerCaseEmail,
      password: passwordHash,
      accountType: user.accountType,
      address: user.address,
      contactNumber: user.contactNumber,
      scopes: user.scopes,
    });
    await newUser.save();
    return newUser;
  }

  async createClient(client: ClientDto): Promise<any> {
    console.log(client);
    const clientExist = await this.userModel.findOne({
      contactNumber: client.contactNumber,
    });
    if (clientExist)
      throw new HttpException(
        'An client with this phone number already exists.',
        HttpStatus.UNAUTHORIZED,
      );
    const newUser = new this.userModel({
      firstName: client.firstName,
      lastName: client.lastName,
      accountType: 'CLIENT',
      address: client.address,
      contactNumber: client.contactNumber,
    });
    await newUser.save();
    return newUser;
  }
  async editUser(id, data: any): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(' Profile does not exist');
    return this.userModel.findByIdAndUpdate(
      id,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        address: data.address,
        status: data.status,
        scopes: data.scopes,
        profileImage: data.profileImage,
      },
      { new: true },
    );
  }

  async fetchByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async getSingleUserByRoleAndId(id): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      _id: id,
    });
    if (!user) throw new NotFoundException(' Profile does not exist');
    return user;
  }
  async getAllUserByRole(role: string): Promise<UserDocument[]> {
    return this.userModel.find({ accountType: role });
  }
  async fetchByEmailAndPassword(email: string) {
    return this.userModel.findOne({ email: email }).select('password');
  }

  async changePassword(id, data): Promise<any> {
    const user = await this.userModel.findById(id).select('password');
    if (!user) throw new HttpException('user not found.', HttpStatus.NOT_FOUND);
    const isValidPassword = await comparePassword(
      data.oldPassword,
      user.password,
    );
    if (!isValidPassword)
      throw new HttpException(
        'old password is incorrect.',
        HttpStatus.FORBIDDEN,
      );
    const hashedPassword = await hashPassword(data.newPassword);
    const differentPassword = await comparePassword(
      data.oldPassword,
      hashedPassword,
    );
    if (!differentPassword) {
      user.password = hashedPassword;
      await user.save();
      throw new HttpException('password changed successfully.', HttpStatus.OK);
    } else
      throw new HttpException(
        'old password and new password can not be same.',
        HttpStatus.FORBIDDEN,
      );
  }

  async deleteUser(id): Promise<any> {
    const result = await this.userModel.findById(id);
    if (!result) throw new BadRequestException('user could not be deleted');
    await this.userModel.findByIdAndUpdate(
      id,
      { status: 'DELETED' },
      { new: true },
    );
    throw new HttpException('user deleted successfully', HttpStatus.OK);
  }

  async deleteAdmin(id): Promise<any> {
    const result = await this.userModel.findOne({
      _id: id,
      accountType: 'ADMIN',
    });
    if (!result) throw new BadRequestException('admin not found');
    await this.userModel.findByIdAndDelete(id);
    throw new HttpException('admin deleted successfully', HttpStatus.OK);
  }
}
