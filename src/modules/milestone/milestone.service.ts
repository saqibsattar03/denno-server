import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Milestone,
  MilestoneDocument,
} from '../../data/schemas/milestone.schema';
import { Model } from 'mongoose';
import { EditMilestoneDto, MilestoneDto } from '../../data/dtos/milestone.dto';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name)
    private readonly milestoneModel: Model<Milestone>,
  ) {}

  async createMilestone(
    milestoneDto: MilestoneDto,
  ): Promise<MilestoneDocument> {
    return this.milestoneModel.create(milestoneDto);
  }

  async getMilestoneByProjectId(projectId): Promise<MilestoneDocument[]> {
    return this.milestoneModel.find({ projectId: projectId });
  }

  async editMilestone(id, data: EditMilestoneDto): Promise<MilestoneDocument> {
    const response = await this.milestoneModel.findById(id);
    if (!response) throw new NotFoundException('no milestone found');
    return this.milestoneModel.findByIdAndUpdate(
      id,
      {
        milestoneName: data.milestoneName,
        status: data.status,
        hours: data.hours,
        startDate: data.startDate,
        endDate: data.endDate,
        media: data.media,
        tasks: data.tasks,
      },
      { new: true },
    );
  }

  async deleteSingleMileStone(id): Promise<any> {
    const response = await this.milestoneModel.findById(id);
    if (!response)
      throw new HttpException('no milestone found', HttpStatus.BAD_REQUEST);
    await this.milestoneModel.findByIdAndDelete(id);
    throw new HttpException('milestone deleted successfully', HttpStatus.OK);
  }

  async deletedMilestonesByProjectId(projectId): Promise<any> {
    const response = await this.milestoneModel.find({ projectId: projectId });
    if (!response)
      throw new HttpException(
        'no milestone found of this project',
        HttpStatus.BAD_REQUEST,
      );
    await this.milestoneModel.deleteMany({ projectId: projectId });
    throw new HttpException(
      'all milestones deleted successfully',
      HttpStatus.OK,
    );
  }
}
