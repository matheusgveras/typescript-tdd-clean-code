export class InvalidCredenciaisError extends Error {
    constructor(){
        super('Credenciais invalidas')
        this.name = 'InvalidCredenciaisError'
    }
}