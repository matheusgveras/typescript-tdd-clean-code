export enum HttpStatusCode {
    ok = 200,
    badRequest = 400,
    unathorized = 401,
    noContent = 204,
    notFound = 404,
    serverError = 500
}

export type HttpResponse<T> = {
    statusCode: HttpStatusCode
    body?: any
}