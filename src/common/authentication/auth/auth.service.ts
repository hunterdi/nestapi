import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwtpayload';
import * as bcrypt from 'bcrypt';
import { configurations } from '../../configurations';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly jwtService: JwtService) { }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async findOne(options?: object): Promise<any> {
        const auth = await this.repository.findOne(options);

        return auth;
    }

    async findByLogin({ username, password }: User): Promise<any> {
        const auth = await this.repository.findOne({ where: { username } });

        if (!auth || !await bcrypt.compareSync(password, auth.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return auth;
    }

    async findByPayload({ username }: any): Promise<any> {
        return await this.findOne({ where: { username } });
    }

    async login(auth: User): Promise<any> {
        const user = await this.findByLogin(auth);
        const token = await this._createToken(user);

        return {
            username: user.username, ...token,
        }
    }

    private async _createToken({ username }: User): Promise<any> {
        const user: JwtPayload = { username };

        const accessToken = await this.jwtService.signAsync(user);
        
        return {
            expiresIn: configurations.JWT.JWT_EXPIRES_IN,
            accessToken,
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.findByPayload(payload);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
