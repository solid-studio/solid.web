import { Connection } from './types'

export const buildFakeConnection = (): Connection => {
    const connection: Connection = {
        name: "Connection 1",
        url: "http://localhost:8545"
    }

    return connection
}

export const buildFakeConnections = (): Connection[] => {
    const connections: Connection[] = [{
        name: "Connection 1",
        url: "http://localhost:8545"
    },
    {
        name: "Connection 2",
        url: "http://localhost:9000"

    }]

    return connections
}
