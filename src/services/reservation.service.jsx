import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/tgs/rmkarts/reservation/');
}

const create = data => {
    return httpClient.post("/tgs/rmkarts/reservation/", data);
}

const get = id => {
    return httpClient.get(`tgs/rmkarts/reservation/${id}`);
}

const update = data => {
    return httpClient.put('tgs/rmkarts/reservation/', data);
}

const remove = id => {
    return httpClient.delete(`tgs/rmkarts/reservation/${id}`);
}
export default { getAll, create, get, update, remove };