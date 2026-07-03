import { AppError } from "../../utils/appError"
import { findUserById } from "../../utils/dbservices"
import * as dashboardRepository from './dashboard.repository'

export const getDashboardData = async (userId: string) => {
    const dashboardData = await dashboardRepository.fetchDashboardData(userId)
    if (!dashboardData) throw new AppError(400, 'Data cant be fetched at this moment')
    return dashboardData
}