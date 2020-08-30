import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, BeforeInsert } from "typeorm";
import { Profile } from "src/domains/profile/profile.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 50
    })
    username: string;

    @Column()
    password: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToOne(type => Profile, profile => profile.user)
    @JoinColumn()
    profile: Profile;

    constructor(partial: Partial<User>){
        Object.assign(this, partial);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @BeforeInsert() 
    async hashPassword() {
        this.password = await bcrypt.hashSync(this.password, 10);
    }
}