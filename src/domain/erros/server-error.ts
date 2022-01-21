export class ServerError extends Error {
    constructor(){
        super('Servidor retornou problemas')
        this.name = 'ServerError'
    }
}