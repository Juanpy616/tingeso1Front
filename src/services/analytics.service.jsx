import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/tgs/rmkarts/analytics/');
};

export default { getAll };