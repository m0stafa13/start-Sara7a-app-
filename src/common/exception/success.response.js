export const successResponse = ({ res, message = "Ok", status = 200, data = undefined }) => {
    res.status(status).json({ message, data })
}