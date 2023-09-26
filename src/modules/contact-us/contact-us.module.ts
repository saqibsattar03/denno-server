import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContactUs,
  ContactUsSchema,
} from '../../data/schemas/contactUs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContactUs.name,
        schema: ContactUsSchema,
      },
    ]),
  ],
  providers: [ContactUsService],
  controllers: [ContactUsController],
})
export class ContactUsModule {}
