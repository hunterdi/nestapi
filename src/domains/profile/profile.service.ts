import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private readonly repository: Repository<Profile>) { }

    async findAll(): Promise<Profile[]> {
        return await this.repository.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.user", "user")
            .getMany();
    }

    async create(data: Profile): Promise<Profile> {
        // const entity = Object.assign(new Profile, data);
        return await this.repository.save(data);
    }

    async update(data: Profile): Promise<UpdateResult> {
        // const entity = Object.assign(new Profile, data);
        return await this.repository.update(data.id, data);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async findByUsername({ username }: any): Promise<Profile> {
        return await this.repository.createQueryBuilder("profile")
        .leftJoinAndSelect("profile.user", "user")
        .where("user.username = :username", { username: username })
        .getOne();
    }
}
