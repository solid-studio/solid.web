import { Status } from '../common/types'

export interface ValidateSourceCode {
  status: Status
  compilerVersion: string
  sourceCode: string
}

export interface LoadCompilerRequest {
  version: string
  status: Status
}
