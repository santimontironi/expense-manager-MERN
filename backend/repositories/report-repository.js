import { Expense } from "../models/expense-model.js";

class ReportRepository {
    async findExpensesSince(fromDate) {
        return await Expense.find({ createdAt: { $gte: fromDate } });
    }
}

const reportRepository = new ReportRepository();
export default reportRepository
