import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    paymentMethod: {
        type: String,
        enum: ['transfer', 'cash'],
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    categorySnapshot: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Expense = mongoose.model('Expense', expenseSchema);
