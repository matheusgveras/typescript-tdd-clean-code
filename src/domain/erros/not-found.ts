export class NotFoundError extends Error {
    constructor(){
        super('Recurso não localizado')
        this.name = 'NotFoundError'
    }
}