import { Controller, Body, Post, Get, UseGuards, Res, Req, UsePipes, Param, UploadedFile, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { Response } from 'express';
import { Readable } from 'typeorm/platform/PlatformTools';
import JwtAuthGuard from 'src/common/authentication/jwt-auth.guard';
import RequestWithUser from 'src/common/authentication/request-with-user';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { profileSchema } from './profile.schema.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../common/components/file.resources';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly service: ProfileService) { }

    @Get()
    async index(): Promise<Profile[]> {
        return this.service.findAll();
    }

    @Post('create')
    @UsePipes(new JoiValidationPipe(profileSchema))
    async create(@Body() data: Profile): Promise<any> {
        return this.service.create(data);
    }

    @Get('home')
    async download(@Req() request: RequestWithUser, @Res() response: Response): Promise<any> {

        const profile = await this.service.findByUsername(request.user);
        const buffer = Buffer.from(profile.ToString(request.connection.remoteAddress || request.ip));
        const stream = new Readable();

        stream.push(buffer);
        stream.push(null);

        response.set({
            'Content-Type': 'text/plain',
            'Content-Lenght': buffer.length,
        });

        return stream.pipe(response);
    }

    @Post('avatar/:id')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: imageFileFilter
    }))
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async avatar(@Param('id', new ParseUUIDPipe()) id: string, @UploadedFile() file): Promise<any> {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };

        return response;
    }
}
