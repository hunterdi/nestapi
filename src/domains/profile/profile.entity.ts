import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert } from "typeorm";
import { StringBuilder } from 'typescript-string-operations';
import { User } from "src/common/authentication/auth/user.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    fullName: string;

    @Column()
    birthday: Date;

    @Column({
        unique: true,
        type: 'bigint',
    })
    ssn: number;

    @Column({
        unique: true,
        type: 'bigint',
    })
    idCard: number;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToOne(type => User, user => user.profile, {
        cascade: true
    })
    user: User;

    constructor(partial: Partial<Profile>){
        Object.assign(this, partial);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @BeforeInsert() 
    async hashPassword() {
        this.user.password = await bcrypt.hashSync(this.user.password, 10);
    }

    ToString(ip?: string): string {
        const result = new StringBuilder();

        result.AppendFormat("Nome Completo: {0}\n", this.fullName);
        result.AppendFormat("Data de Nascimento: {0}\n", this.birthday.toLocaleDateString());
        result.AppendFormat("CPF: {0}\n", this.ssn.toString());
        result.AppendFormat("RG: {0}\n", this.idCard.toString());
        result.Append("\n");
        result.Append("Usuario Autenticado\n");
        result.AppendFormat("Login: {0}\n", this.user.username);
        result.AppendFormat("IP: {0}\n", ip);

        return result.ToString();
    }
}