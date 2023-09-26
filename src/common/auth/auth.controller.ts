import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { UserDto } from '../../data/dtos/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ type: 'access_token' })
  signIn(@Request() request: any): Promise<any> {
    return this.authService.signIn(request.body);
  }

  @Post('/sign-up')
  @ApiBody({ type: UserDto })
  signUp(@Body() userData) {
    console.log('user data :: ', userData);
    return this.authService.signUp(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({
    // type: IUser,
    description: 'Get Profile from access token',
  })
  @ApiBadRequestResponse({ description: 'token is not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  fetchUserProfileUsingToken(@Request() request) {
    return this.authService.fetchUserProfileUsingToken(request.user.email);
  }
}
