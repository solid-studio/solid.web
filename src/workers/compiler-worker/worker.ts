import { IMessageEvent, MessageType, IValidateSourceCodeResultMessage } from '../../worker-redux/types'
import { solidityCompilerVersionsMap, solidityCompilerInstanceMap } from './compiler-versions'
import { simpleCompilerInput } from './compiler-input'
import { Status } from '../../redux/types'
import wrapper from 'solc/wrapper'

const ctx: Worker = self as any

const BASE_URL = 'https://solc-bin.ethereum.org/bin/'

ctx.onmessage = (event: IMessageEvent) => {
  const msg = event.data
  console.log('Event msg', msg)
  switch (msg.type) {
    case MessageType.LOAD_COMPILER_VERSION:
      const version = solidityCompilerVersionsMap.get(msg.payload.version)
      console.log('Version', version, msg.payload.version)
      const url = `${BASE_URL}${version}`
      ;(ctx as any).importScripts(url)
      const compiler = wrapper((ctx as any).Module)
      solidityCompilerInstanceMap.set(version, compiler)
      const compilerInstance = solidityCompilerInstanceMap.get(version)
      console.log('Compiler Instance', compilerInstance)
      // TODO, if it is already cached, then no need to re load..
      ctx.postMessage({
        type: MessageType.LOAD_COMPILER_VERSION_RESULT,
        payload: {
          version: 1,
          status: Status.Completed
        }
      })
      break
    case MessageType.VALIDATE_SOURCE_CODE:
      const { sourceCode, compilerVersion } = msg.payload
      const inputObject: any = {}
      inputObject[`${name}`] = {
        content: sourceCode
      }
      try {
        const input = simpleCompilerInput(inputObject, { optimize: true })
        const version = solidityCompilerVersionsMap.get(compilerVersion)
        const compilerInstance = solidityCompilerInstanceMap.get(version)
        const result = JSON.parse(compilerInstance.compile(input))
        console.log('Result', result)
        const validateSourceCodeResult: IValidateSourceCodeResultMessage = {
          type: MessageType.VALIDATE_SOURCE_CODE_RESULT,
          payload: {
            compilerVersion,
            sourceCode,
            status: Status.Completed,
            isValid: result.errors === undefined
          }
        }
        ctx.postMessage(validateSourceCodeResult)
      } catch (e) {
        ctx.postMessage({
          type: MessageType.ERROR,
          error: e.message
        })
      }
      break
  }
}
