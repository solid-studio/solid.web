import React, { useState } from 'react'

import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AbiItem, AbiInput, AbiOutput } from 'web3-utils'
import styled from 'styled-components'
import { Input, Button, Tag } from 'antd'

import { executeContractFunction } from '../../redux/web3-actions'
import { ApplicationState } from '../../redux/reducers'
import { AsynActionThunkCreator } from '../../redux/thunk-types'

const InputGroup = Input.Group

interface ContractViewProps {
  abi: AbiItem
  executeContractFunction: AsynActionThunkCreator
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

const ContractView: React.FC<ContractViewProps> = (props: ContractViewProps) => {
  const { abi } = props
  const { name, inputs, outputs } = abi
  const inputStrings = MapInputs(inputs)
  const outputStrings = MapOutputs(outputs)
  const [fields, setField] = useState(initialValues)

  const sendAction = () => {
    console.log('About to send data')
    props.executeContractFunction(abi, fields)
  }

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
        <StyledButton onClick={sendAction} type="primary">
          {isReadOnlyFunction(abi) ? 'Call' : 'Send'}
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
