import request from "../utils/request";

export function listTicket(params){
    return request.get('/ticket',{params})
}

export function submitTicket(data){
    return request.post('/ticket',data)
}

export function getTicket(id){
    return request.get(`/ticket/${id}`)
}

export function updateTicket(data,id){
    return request.put(`/ticket/${id}`,data)
}