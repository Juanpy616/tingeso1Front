import axios from "axios";

const kartBackendServer = import.meta.env.VITE_KART_BACKEND_SERVER;
const kartBackendPort = import.meta.env.VITE_KART_BACKEND_PORT;

console.log(kartBackendServer)
console.log(kartBackendPort)

export default axios.create({
    baseURL: `http://${kartBackendServer}:${kartBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});