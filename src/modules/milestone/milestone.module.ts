import { forwardRef, Module } from '@nestjs/common';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Milestone,
  MilestoneSchema,
} from '../../data/schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Milestone.name,
        schema: MilestoneSchema,
      },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}
