import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { MilestoneDto } from '../../data/dtos/milestone.dto';

@ApiTags('Milestone')
@Controller('milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Post()
  @ApiBody({ type: MilestoneDto })
  createMilestone(@Body() data) {
    return this.milestoneService.createMilestone(data);
  }

  @Get('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  getMilestoneByProjectId(@Param('id') id) {
    return this.milestoneService.getMilestoneByProjectId(id);
  }

  @Patch('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  editMilestone(@Body() data, @Param('id') id) {
    return this.milestoneService.editMilestone(id, data);
  }

  @Delete('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  deleteSingleMilestone(@Param('id') id) {
    return this.milestoneService.deleteSingleMileStone(id);
  }
}
