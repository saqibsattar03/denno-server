import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ContactUs,
  ContactUsDocument,
} from '../../data/schemas/contactUs.schema';
import { ContactUsDto, EditContactUsDto } from '../../data/dtos/contactUs.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private readonly contactUsModel: Model<ContactUsDocument>,
  ) {}

  async create(ticketDto: ContactUsDto): Promise<ContactUsDocument> {
    return this.contactUsModel.create(ticketDto);
  }

  async getAllQueriesByUserId(userId: any): Promise<ContactUsDocument[]> {
    return this.contactUsModel.find({ userId: userId });
  }

  async getAllQueries(): Promise<ContactUsDocument[]> {
    return this.contactUsModel.find();
  }

  async getSingleQuery(ticketId: any): Promise<ContactUsDocument> {
    return this.contactUsModel.findById(ticketId);
  }

  async editQuery(id: any, data: EditContactUsDto): Promise<ContactUsDocument> {
    const ticket = await this.contactUsModel.findById(id);
    if (!ticket) throw new NotFoundException('no ticked found');
    return this.contactUsModel.findByIdAndUpdate(
      id,
      {
        problem: data.description,
        media: data.media,
      },
      { new: true },
    );
  }

  async deleteQuery(id: any): Promise<any> {
    const ticket = await this.contactUsModel.findById(id);
    if (!ticket) throw new NotFoundException('no such ticked found');
    await this.contactUsModel.findByIdAndDelete(id);
    throw new HttpException('ticket deleted successfully', HttpStatus.OK);
  }
}
