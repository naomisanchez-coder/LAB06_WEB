import User from "../models/User.js";

const userRepository = {
    create: async (userData) => {
        return await User.create(userData);
    },
    update: async (id, userData) => {
        return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    findByEmail: async (email) => {
        return await User.findOne({ email });
    }
};

export default userRepository;