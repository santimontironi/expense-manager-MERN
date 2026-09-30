import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authRepository from '../repositories/auth-repository.js';

class AuthServices {
    async login(username, password) {
        const user = await authRepository.findUserByUsername(username);
        if (!user) {
            const error = new Error('Usuario o contraseña incorrectos');
            error.status = 401;
            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            const error = new Error('Usuario o contraseña incorrectos');
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return { token, id: user._id, username: user.username };
    }

    async me(id) {
        const user = await authRepository.findUserById(id);
        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }

        return { id: user._id, username: user.username };
    }
}

const authServices = new AuthServices();
export default authServices;
