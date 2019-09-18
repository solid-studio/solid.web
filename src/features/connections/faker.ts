import { Connection } from './types'
import { generateFakeObjectId } from 'utils/fakeObjectId'
export const buildFakeConnection = (): Connection => {
    const connection: Connection = {
        name: "Connection 1",
        url: "http://localhost:8545",
        _id: generateFakeObjectId()
    }

    return connection
}

export const buildFakeConnections = (): Connection[] => {
    const connections: Connection[] = [
        buildFakeConnection(),
        {
            name: "Connection 2",
            url: "http://localhost:9000",
            _id: generateFakeObjectId()

        }]

    return connections
}
