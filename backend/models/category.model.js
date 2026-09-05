import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);
