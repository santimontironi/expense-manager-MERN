import reportService from "../services/report-service.js"

class ReportController {
    async getLastWeekReport(req, res) {
        try {
            const report = await reportService.getLastWeekReport(req.user.id)
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }

    async getMonthlyExpensesReport(req, res) {
        try {
            const report = await reportService.getMonthlyExpensesReport(req.user.id)
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }

    async getTopExpensesReport(req, res) {
        try {
            const report = await reportService.getTopExpensesReport(req.user.id)
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }

    async getCategoryBreakdownReport(req, res) {
        try {
            const report = await reportService.getCategoryBreakdownReport(req.user.id)
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }

    async getCategoryLimitStatus(req, res) {
        try {
            const report = await reportService.getCategoryLimitStatus(req.user.id)
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }
}

const reportController = new ReportController()
export default reportController
