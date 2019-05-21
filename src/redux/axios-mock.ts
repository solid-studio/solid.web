import { CONNECTION_URL } from "./constants";

const uuidv4 = require('uuid/v4');

export const getMocks = (mock: any) => {

    const sampleConnection = {
        name: "Connection 1",
        id: uuidv4(),
        url: "http://localhost:8545"
    }

    mock.onPost(`${CONNECTION_URL}`).reply(200, sampleConnection)

    mock.onGet(`${CONNECTION_URL}`).reply(200, [sampleConnection])
}

