import React, { useState, useEffect } from 'react'

import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'
import { AbiItem, AbiInput, AbiOutput } from 'web3-utils'

import styled from 'styled-components'
import { Input, Button, Tag } from 'antd'

import { ApplicationState } from '../../rootReducer'

import { executeContractFunction } from '../actions'
import { Connection, ConnectionType } from '@solid-explorer/types'

const InputGroup = Input.Group

interface ContractViewProps {
  abi: AbiItem[]
  abiItem: AbiItem
  contractAddress: string
  executeContractFunction: ActionCreator<Action>
  currentConnection: Connection
}

const StyledInput = styled(Input)`
  display: block;
  margin-top: 1em;
  font-size: 0.8em;
`

const StyledInputGroup = styled(InputGroup)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  height: 26px;
  font-size: 0.8em;
  margin-top: 1em;
  width: 7em;
`
const Container = styled.div`
  margin: 0;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 1em;
  border-bottom: 0.1px solid #3e3e3e;
  padding-bottom: 1em;
`

const MapInputs = (input: AbiInput[] | undefined): string => {
  if (!input) {
    return ''
  }
  const result = input.reduce((previous: any, current: AbiInput, index: number) => {
    return index === 0 ? `${current.type} ${current.name}` : `${previous}, ${current.type} ${current.name}`
  }, '')
  return result
}

const MapOutputs = (output: AbiOutput[] | undefined): string => {
  if (!output) {
    return ''
  }
  const result = output.reduce((previous: any, current: AbiInput, index: number) => {
    return index === 0 ? `${current.type} ${current.name}` : `${previous}, ${current.type} ${current.name}`
  }, '')
  return result
}

const isReadOnlyFunction = (abi: AbiItem | undefined) => {
  if (!abi || !abi.stateMutability) {
    return true
  }
  const readOnlyModifiers = ['pure', 'view', 'constant']
  return readOnlyModifiers.indexOf(abi.stateMutability) > -1
}

interface HashMapOfValues {
  [index: number]: string
}

const initialValues: HashMapOfValues = {}
const ethers = (window as any).ethers

const ContractView: React.FC<ContractViewProps> = (props: ContractViewProps) => {
  const { abiItem, abi, contractAddress, currentConnection } = props
  const { url } = currentConnection
  const { name, inputs, outputs } = abiItem
  // console.log("INPUTs", inputs)
  const functionName = name
  const inputStrings = MapInputs(inputs)
  const outputStrings = MapOutputs(outputs)
  const [fields, setField] = useState(initialValues)
  const [isCalling, setIsCalling] = useState(false);
  // const [calledName, setClickedItem] = useState('')
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (currentConnection.type === ConnectionType.Public) {
      throw new Error('Public chain interactions not supported yet')
    }

    const provider = new ethers.providers.JsonRpcProvider(url);
    // console.log("PROVIDER", provider)
    // console.log("contractAddress", contractAddress)
    // console.log("abi", abi)

    if (!contractAddress && !abi && !provider) {
      return
    }

    const getOrSendTransaction = async () => {
      try {
        console.log("Function name", functionName)

        const accounts = await provider.listAccounts()
        // console.log("accounts", accounts)

        // TODO: Fix and sort out key management
        const signer = await provider.getSigner(accounts[0])
        // console.log("signer", signer)

        // let contract = new ethers.Contract(contractAddress, abi, provider);
        // console.log("contract", contract)

        const interfaceFromABI = new ethers.utils.Interface(abi)
        // if (!calledName) {
        //   throw new Error('Invalid value selected')
        // }
        // const value = fields[calledName as any]
        // console.log("Value", value)
        // console.log("fields", fields)

        // console.log("interfaceFromABI.functions[name as string].encode", interfaceFromABI.functions[name as string].encode)
        // at this point all should be valid
        const dataToEncode = inputs && inputs.map((item, index) => {
          return fields[index]
        })
        console.log("Data to encode", dataToEncode)
        // const result = [{
        //   type,
        //   name
        // }]

        const calldata = interfaceFromABI.functions[functionName as string].encode(dataToEncode);
        // console.log("Encoded data", calldata)

        const transactionRequest = {
          to: contractAddress,
          data: calldata
        }

        const result = await signer.sendTransaction(transactionRequest);
        console.log("RESULT", result)
        setResponse(result);
        setIsCalling(false)
      } catch (error) {
        console.log("ERROR", error)
        setError(error);
        setIsCalling(false)
      }
    };

    if (isCalling) {
      getOrSendTransaction()
      console.log("IS CALLING")
    }
  })

  return (
    <Wrapper>
      <Container style={{ marginTop: '0' }}>
        <Tag color="blue">function</Tag>
        <p style={{ color: 'white', margin: '0', display: 'inline', fontSize: '0.9em' }}>
          {name}
          <span>
            ({inputStrings.trim()}): returns ({outputStrings})
          </span>
        </p>
      </Container>
      <Container>
        <StyledInputGroup>
          {inputs &&
            inputs.map((item, index) => {
              return (
                <StyledInput
                  value={fields[index]}
                  onChange={e => {
                    console.log('Index', index)
                    setField({ ...fields, [index]: e.target.value })
                  }}
                  key={index}
                  size="small"
                  style={{ width: '35%' }}
                  type="text"
                  placeholder={`${item.type} ${item.name}`}
                />
              )
            })}
        </StyledInputGroup>
      </Container>
      <Container>
        <StyledButton onClick={() => setIsCalling(true)} type="primary">
          {isReadOnlyFunction(abiItem) ? 'Call' : 'Send'}
        </StyledButton>
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      executeContractFunction
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractView)
