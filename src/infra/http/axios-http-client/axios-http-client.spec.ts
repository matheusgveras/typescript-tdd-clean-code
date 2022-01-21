import { AxiosHttpClient } from "./axios-http-client"
import { HttpPostParams } from "@/data/protocols/http"
import { mockAxios } from "@/infra/test"
import { mockPostRequest } from "@/data/test"
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()
    return {
        sut,
        mockedAxios
    }
}



describe('AxiosHttpClient', () => {
    
    test('Verificando se o axios recebe parametros de forma correta ', async () => {
        const request = mockPostRequest()
         const {sut, mockedAxios} = makeSut()
         await sut.post(request)
         expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
     })
     test('Verificando a resposta correta para a requisição no axios', () => {
         const {sut, mockedAxios} = makeSut()
         const promisse = sut.post(mockPostRequest())
         expect(promisse).toEqual(mockedAxios.post.mock.results[0].value)
     })
})