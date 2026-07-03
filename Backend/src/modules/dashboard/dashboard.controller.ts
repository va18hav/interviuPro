import { Request, Response } from "express";
import * as dashboardService from './dashboard.service'

export const getDashboardData = async (req: Request, res: Response) => {
    const userId = req.userId as string
    const data = await dashboardService.getDashboardData(userId)
    res.status(200).json({
        success: true,
        message: 'Dashboard data fetched successfully',
        data: data
    })
}