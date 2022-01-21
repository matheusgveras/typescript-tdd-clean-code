import axios from "axios"
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedfAxios = axios as jest.Mocked<typeof axios>
    mockedfAxios.post.mockResolvedValue(
        {
            data: faker.random.objectElement(),
            status: faker.random.number()
        }
    )
   return mockedfAxios
}


