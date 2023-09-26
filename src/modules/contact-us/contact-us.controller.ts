import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ContactUsService } from './contact-us.service';
import { ContactUsDto } from '../../data/dtos/contactUs.dto';

@ApiTags('Contact us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  @ApiBody({ type: ContactUsDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() data, @Request() request) {
    data.userId = request.user.userId;
    return this.contactUsService.create(data);
  }
  @Get('/all')
  getAllQueries() {
    return this.contactUsService.getAllQueries();
  }
  @Get('/all-by-user-id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  getAllQueriesByUserId(@Request() request) {
    return this.contactUsService.getAllQueriesByUserId(request.user.userId);
  }

  @Get('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  getSingleQuery(@Param('id') id) {
    return this.contactUsService.getSingleQuery(id);
  }

  @Patch('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  @ApiBody({ type: ContactUsDto })
  editQuery(@Param('id') id, @Body() data) {
    return this.contactUsService.editQuery(id, data);
  }

  @Delete('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  deleteQuery(@Param('id') id) {
    return this.contactUsService.deleteQuery(id);
  }
}
