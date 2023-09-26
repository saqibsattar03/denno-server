import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../../data/schemas/project.schema';
import { Model } from 'mongoose';
import { EditProjectDto, ProjectDto } from '../../data/dtos/project.dto';
import { MilestoneService } from '../milestone/milestone.service';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(forwardRef(() => MilestoneService))
    private readonly milestoneService: MilestoneService,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(projectDto: ProjectDto): Promise<ProjectDocument> {
    const project = await this.projectModel.create(projectDto);
    if (!project) throw new NotFoundException();
    return project;
  }

  async getAllProjectsOfAgency(agencyId: any): Promise<ProjectDocument[]> {
    return this.projectModel.find({ agencyId: agencyId });
  }

  async getAllProjectsOfClient(clientId: any): Promise<ProjectDocument[]> {
    return this.projectModel.find({ clientId: clientId });
  }

  async getSingleProject(projectId: any): Promise<any> {
    const project = await this.projectModel.findById(projectId);
    if (!project)
      throw new HttpException('no project found', HttpStatus.BAD_REQUEST);
    const milestones = await this.milestoneService.getMilestoneByProjectId(
      project._id,
    );
    return {
      project,
      milestones,
    };
  }

  async editProject(id: any, data: EditProjectDto): Promise<ProjectDocument> {
    const response = await this.projectModel.findById(id);
    if (!response) throw new NotFoundException('no project found');
    return this.projectModel.findByIdAndUpdate(
      id,
      {
        projectName: data.projectName,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      { new: true },
    );
  }

  async deleteProject(id: any): Promise<any> {
    const response = await this.projectModel.findById(id);
    if (!response)
      throw new HttpException('no project found', HttpStatus.BAD_REQUEST);
    await this.milestoneService.deletedMilestonesByProjectId(id);
    await this.projectModel.findByIdAndDelete(id);
    throw new HttpException('project deleted successfully', HttpStatus.OK);
  }
}
