import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/appError'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // 1. Zod validation errors
    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation failed: Please enter a valid email and password",
            errors: err.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        })
        return
    }

    // 2. Your custom application errors
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
        })
        return
    }

    // 3. Unexpected errors (bugs, DB connection failures, etc.)
    console.error("Unhandled error:", err)
    res.status(500).json({ message: "Internal server error" })
}
