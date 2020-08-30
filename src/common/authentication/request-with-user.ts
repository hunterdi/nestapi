import { Request } from 'express';
import { User } from './auth/user.entity';

export default interface RequestWithUser extends Request {
    user: User,
}