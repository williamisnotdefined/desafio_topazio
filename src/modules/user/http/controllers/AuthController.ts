import { Request, Response } from 'express';

import AuthLoginService from '@modules/user/services/AuthLoginService';

class AuthController {
    public async login(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email, password } = request.body;

        const user = await AuthLoginService({
            email,
            password
        });

        return response.json(user);
    }
}

export default new AuthController();
