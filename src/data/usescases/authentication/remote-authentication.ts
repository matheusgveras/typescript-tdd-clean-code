import {HttpPostClient, HttpStatusCode} from "@/data/protocols/http"
import {InvalidCredenciaisError, NotFoundError, ServerError, UnexpetectedError} from "@/domain/erros"
import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication"
import { AccountModel } from "@/models/account-model";
export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) { }
    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpResposne = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResposne.statusCode) {
            case HttpStatusCode.ok: return httpResposne.body
            case HttpStatusCode.unathorized: throw new InvalidCredenciaisError()
            case HttpStatusCode.notFound: throw new NotFoundError()
            case HttpStatusCode.serverError: throw new ServerError()
            default: throw new UnexpetectedError()
        }
    }
}