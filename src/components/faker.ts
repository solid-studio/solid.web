import { GenericType } from './fakeTypes'

export const buildFakeGenericType = (): GenericType[] => {
  const genericSamples: GenericType[] = [
    {
      name: 'Connection 1',
      url: 'http://localhost:8545'
    },
    {
      name: 'Connection 2',
      url: 'http://localhost:9000'
    }
  ]

  return genericSamples
}
