export const createResponse = (res: any, success: any = true, code: any, message: any = "", result: any = [], error: any = false) => {
    return res.json({
        success,
        code,
        message,
        result,
        error
    })
}