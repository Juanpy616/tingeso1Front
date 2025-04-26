import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/tgs/rmkarts/kart/');
}

const create = data => {
    return httpClient.post("/tgs/rmkarts/kart/", data);
}

const remove = id => {
    return httpClient.delete(`tgs/rmkarts/kart/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/tgs/rmkarts/kart/${id}`, data);
};

export default { getAll, create, remove, update };