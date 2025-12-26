type errOptions = {
    status?: number,
    code?: string
    details?: null
}

class AppError extends Error {
    status: number;
    constructor(message:string="Internal Error", {status=400, code="INTERNAL_ERROR"}: errOptions={}){
        super(message);
        this.status = status;
    }
}

class CreateError extends AppError{
    constructor(message:string="Create Error"){
        super(message, {status:401, code: "CREATE_ERROR"});
    }
}

class FetchError extends AppError{
    constructor(message:string="Fetch Error"){
        super(message, {status:404, code: "FETCH_ERROR"});
    }
}




export {AppError, CreateError, FetchError};