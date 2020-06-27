// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from '@modules/user/schema/UserSchema';

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}
