export class UnexpetectedError extends Error {
    constructor(){
        super('Tente novmanete em breve')
        this.name = 'UnexpetectedError'
    }
}