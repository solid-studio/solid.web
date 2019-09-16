import { generateFakeObjectId } from './fakeObjectId'
describe('fakeObjectId', () => {

    it('tests', () => {
        const result = generateFakeObjectId()

        console.log("RESULT", result)
        expect(result).toBeDefined()
        expect(result).toHaveLength(24) // 12 bytes https://docs.mongodb.com/manual/reference/method/ObjectId/
    })
})