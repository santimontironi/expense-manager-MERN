import authServices from '../services/auth-services.js';

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const { token, id, username: loggedUsername } = await authServices.login(username, password);

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
            });

            res.status(200).json({ id, username: loggedUsername });
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async me(req, res) {
        try {
            const user = await authServices.me(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const authController = new AuthController();
export default authController;
