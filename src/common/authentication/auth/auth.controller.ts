import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { authSchema } from './auth.schema.validator';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post('login')
    @UsePipes(new JoiValidationPipe(authSchema))
    async login(@Body() data: User): Promise<any> {
        return this.service.login(data);
    }
}
