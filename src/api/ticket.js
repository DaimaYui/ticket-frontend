import request from "../utils/request";

export function listTicket(params){
    return request.get('/ticket',{params})
}