import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/tgs/rmkarts/voucher/');
}

const create = data => {
    return httpClient.post("/tgs/rmkarts/voucher/", data);
}

const get = id => {
    return httpClient.get(`tgs/rmkarts/voucher/${id}`);
}

const update = data => {
    return httpClient.put('tgs/rmkarts/voucher/', data);
}



const remove = id => {
    return httpClient.delete(`tgs/rmkarts/voucher/${id}`);
}
export default { getAll, create, get, update, remove };