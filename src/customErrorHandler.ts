type errOptions = {
    status?: number,
    code?: string
    details?: null
}

class AppError extends Error {
    status: number;
    code: string;
    constructor(message:string="Internal Error", {status=400, code="INTERNAL_ERROR"}: errOptions={}){
        super(message);
        this.status = status;
        this.code = code;
    }
}

class CreateError extends AppError{
    constructor(message:string="Create Error", {status=401, code= "CREATE_ERROR"}:errOptions={}){
        super(message, {status:401, code: "CREATE_ERROR"});
        this.status = status;
        this.code = code;
    }
}

class FetchError extends AppError{
    constructor(message:string="Fetch Error", {status=404, code= "FETCH_ERROR"}:errOptions={}){
        super(message, {status:404, code: "FETCH_ERROR"});
        this.status = status;
        this.code = code;
    }
}

export {AppError, CreateError, FetchError};