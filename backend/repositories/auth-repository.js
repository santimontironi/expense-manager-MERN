import { User } from '../models/user-model.js';

class AuthRepository {
    async findUserByUsername(username) {
        return await User.findOne({ username });
    }

    async createUser(username, password) {
        return await User.create({ username, password });
    }

    async findUserById(id) {
        return await User.findById(id).select('-password');
    }
}

const authRepository = new AuthRepository();
export default authRepository;
