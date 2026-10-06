// error response
export const ErrorResponse = ({
    message = "Some thing went wrong",
    status = 400,
    extra = undefined } = {}) => {
    throw new Error(message, { cause: { status, extra } })
}

//! exception filters 

// bad request exception 
export const BadRequestException = ({ message = "Bad Request", extra = undefined } = {}) => {
    return ErrorResponse({ status: 400, message, extra })
}
// not found exception
export const NotFoundException = ({ message = "Error not found", extra = undefined } = {}) => {
    return ErrorResponse({ status: 404, message, extra })
}
// conflict exception 
export const ConflictException = ({ message = "Error conflict", extra = undefined } = {}) => {
    return ErrorResponse({ status: 409, message, extra })
}
// un authorized
export const UnAuthorizedException = ({ message = "Error un authorized", extra = undefined } = {}) => {
    return ErrorResponse({ status: 401, message, extra })
}
// forbidden exception 
export const ForbiddenException = ({ message = "Error Forbidden", extra = undefined } = {}) => {
    return ErrorResponse({ status: 403, message, extra })
}