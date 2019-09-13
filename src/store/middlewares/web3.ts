import { Middleware } from 'redux'
import { AbiCoder } from 'web3-eth-abi'

import { Web3ActionType, Web3Action } from '../../utils/web3-helper'

// const abiCoder = new AbiCoder()

const web3Middleware: Middleware = ({ dispatch, getState }) => next => (action: Web3Action) => {
  if (action.type === Web3ActionType.Web3Action) {
    // const { onProgress, onError, onSuccess } = action.meta;
    const mappedArguments = Object.values(action.payload.parameters)
    console.log('mappedArguments', mappedArguments)
    const encodedData = new AbiCoder.encodeFunctionCall(action.payload.abi, mappedArguments)
    console.log('ENCODED DATA', encodedData)

    // if (onProgress) {
    //     console.log("On Progress", onProgress)
    // }
    // console.log("onError", onError)
    // console.log("onSuccess", onSuccess)
  }
  return next(action)
}

export default web3Middleware
