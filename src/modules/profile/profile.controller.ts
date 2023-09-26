import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Request,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth/guards/jwtAuth.guard';
import { EditUserDto } from '../../data/dtos/user.dto';
import { ClientDto } from '../../data/dtos/client.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/client/create')
  @ApiBody({ type: ClientDto })
  createClient(@Body() data) {
    return this.profileService.createClient(data);
  }
  @Get('/:id')
  @ApiParam({ type: String, name: 'id' })
  getSingleUserByRoleAndId(@Param('id') id) {
    return this.profileService.getSingleUserByRoleAndId(id);
  }
  @Get('/role/:role')
  @ApiParam({ type: String, name: 'role' })
  getAllUserByRole(@Param('role') role: string) {
    return this.profileService.getAllUserByRole(role);
  }

  @Patch('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  @ApiBody({ type: EditUserDto })
  editProject(@Body() data, @Param('id') id) {
    return this.profileService.editUser(id, data);
  }

  @Patch('/update-password/:id')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
      },
    },
  })
  @ApiResponse({ description: 'password updated successfully' })
  @ApiBadRequestResponse({ description: 'could not update  password' })
  // @UseGuards(JwtAuthGuard)
  changePassword(@Param('id') id, @Body() data) {
    return this.profileService.changePassword(id, data);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Request() request) {
    return this.profileService.deleteUser(request.user.userId);
  }

  @Delete('/admin/:id')
  @ApiParam({ type: String, name: 'id' })
  deleteAdmin(@Param('id') id) {
    return this.profileService.deleteAdmin(id);
  }
}
