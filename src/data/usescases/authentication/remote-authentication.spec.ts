import { RemoteAuthentication } from './remote-authentication'
import {HttpPostClientSpy} from '@/data/test/mock-http-client'
import {mockAccountModel, mockAuthentication} from '@/domain/test/mock-account'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredenciaisError, UnexpetectedError, ServerError, NotFoundError } from '@/domain/erros'
import { AccountModel } from '@/models'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('Chamando httpPostClient com uma url correta', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Chamando httpPostClient com uma body correto', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })
    test('Verificando se HttpPostClient captura erro 401 ', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }
        const promisse =  sut.auth(mockAuthentication())
        await expect(promisse).rejects.toThrow(new InvalidCredenciaisError())
    })
    test('Verificando se HttpPostClient captura erro 400 ', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promisse =  sut.auth(mockAuthentication())
        await expect(promisse).rejects.toThrow(new UnexpetectedError())
    })
    test('Verificando se HttpPostClient captura erro 404 ', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promisse =  sut.auth(mockAuthentication())
        await expect(promisse).rejects.toThrow(new NotFoundError())
    })
    test('Verificando se HttpPostClient captura erro 500 ', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promisse =  sut.auth(mockAuthentication())
        await expect(promisse).rejects.toThrow(new ServerError())
    })
    test('Verificando se HttpPostClient recebe AccountModel quando statusCode for 200 ', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }

        const account = await sut.auth(mockAuthentication())
        expect(account).toEqual(httpResult)
    })
})