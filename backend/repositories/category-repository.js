import { Category } from '../models/category-model.js';
import { Expense } from '../models/expense-model.js';

class CategoryRepository {
    async findById(id) {
        const category = await Category.findById(id);
        if (!category) return null;

        const expenses = await Expense.find({ categoryId: id })
            .select('-categoryId')
            .sort({ createdAt: -1 }); //ese select quita el campo categoryId de los expenses, ya que no es necesario devolverlo en la respuesta

        return { category, expenses };
    }

    async findAll() {
        return await Category.aggregate([ //se extraen todas las categorías y se les agrega un campo con la cantidad de expenses asociados
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

    async createCategory(name, color) {
        return await Category.create({ name, color });
    }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
