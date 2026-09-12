import reportService from "../services/report-service.js"

class ReportController {
    async getLastWeekReport(req, res) {
        try {
            const report = await reportService.getLastWeekReport()
            res.status(200).json(report)
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message })
        }
    }
}

const reportController = new ReportController()
export default reportController