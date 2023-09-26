import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { EditProjectDto, ProjectDto } from '../../data/dtos/project.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBody({ type: ProjectDto })
  createProject(@Body() data: ProjectDto) {
    return this.projectService.createProject(data);
  }

  @Get('/agency/:id')
  @ApiParam({ type: 'string', name: 'id' })
  getAllProjectsOfAgency(@Param('id') id) {
    return this.projectService.getAllProjectsOfAgency(id);
  }

  @Get('/client/:id')
  @ApiParam({ type: 'string', name: 'id' })
  getAllProjectsOfClient(@Param('id') id) {
    return this.projectService.getAllProjectsOfClient(id);
  }

  @Get('/single/:id')
  @ApiParam({ type: 'string', name: 'id' })
  getSingleProject(@Param('id') id) {
    return this.projectService.getSingleProject(id);
  }

  @Patch('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  @ApiBody({ type: EditProjectDto })
  editProject(@Body() data, @Param('id') id) {
    return this.projectService.editProject(id, data);
  }

  @Delete('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  deleteProject(@Param('id') id) {
    return this.projectService.deleteProject(id);
  }
}
