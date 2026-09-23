import mongoose from 'mongoose';
import { Category } from '../models/category-model.js';
import { Expense } from '../models/expense-model.js';

class CategoryRepository {
    async findById(id, userId) {
        const category = await Category.findOne({ _id: id, userId });
        if (!category) return null;

        const expenses = await Expense.find({ categoryId: id, userId })
            .select('-categoryId')
            .sort({ createdAt: -1 }); //ese select quita el campo categoryId de los expenses, ya que no es necesario devolverlo en la respuesta

        return { category, expenses };
    }

    async findAll(userId) {
        return await Category.aggregate([ //se extraen todas las categorías del usuario y se les agrega un campo con la cantidad de expenses asociados
            // aggregate() no castea tipos como sí hace Mongoose en find(), por
            // eso hay que convertir el string a ObjectId a mano para que matchee.
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: { //lookup es un join entre colecciones
                    from: 'expenses', // join contra la colección "expenses"
                    localField: '_id', // campo de Category a comparar (_id)
                    foreignField: 'categoryId', // campo de Expense a comparar
                    as: 'expenses', // resultado: array de expenses que matchean, guardado en este campo
                },
            },
            { $addFields: { expenseCount: { $size: '$expenses' } } }, // agrega expenseCount = largo del array "expenses"
            { $project: { expenses: 0 } }, // saca el array "expenses" del resultado final, solo queda el count
        ]);
    }

    async createCategory(userId, name, color, spendingLimit) {
        return await Category.create({ userId, name, color, spendingLimit });
    }

    async editCategory(id, userId, name, color, spendingLimit) {
        return await Category.findOneAndUpdate({ _id: id, userId }, { name, color, spendingLimit }, { returnDocument: 'after' });
    }

    async findNameById(id, userId) {
        return await Category.findOne({ _id: id, userId }).select('name');
    }

    async deleteCategory(id, userId) {
        return await Category.findOneAndDelete({ _id: id, userId })
    }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
