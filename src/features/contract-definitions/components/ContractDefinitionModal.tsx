import React from 'react'
import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { FormikErrors, Field, FieldProps } from 'formik'

import { ContractDefinition } from '@solidstudio/types'

import { InputFormItem, TextAreaFormItem } from 'components'

import { ApplicationState } from '../../rootReducer';
import { Status } from "../../common/types" // TODO: this shouldn't be the case with Sagas

import { createOrUpdateContractDefinition, closeContractDefinitionsModal } from '../actions'
import { ContractDefinitionModalComponent } from "./ContractDefinitionModalComponent";

import { RadioField } from './RadioField';

// TODO: TO REMOVE
import { simpleCompilerInput } from '../../compiler/worker/compiler-input'
// import { solc } from '../../../utils/compiler'
// console.log("SOLC", solc)
const FORM_ID = 'CONTRACT_DEFINITION_FORM'
const FORM_TITLE = "Add Contract Definition"

const defaultRadioFormOptions = [
  {
    key: 'sourcecode',
    value: 'Source Code'
  },
  {
    key: 'abi',
    value: 'ABI'
  },
  {
    key: 'bytecode',
    value: 'Bytecode'
  }
  // {
  //   key: 'contract',
  //   value: 'Contract'
  // }
]

const defaultContractDefinition: ContractDefinition = {
  name: '',
  sourceCode: '',
  abi: [],
  bytecode: '',
  runtimeBycode: '',
  sourceMap: '',
  deployedSourceMap: ''
}

interface OwnProps {
  item: ContractDefinition
}

interface StateProps {
  visible: boolean
  loading: boolean
  submitted: boolean
}

interface DispatchProps {
  createOrUpdateContractDefinition: (item: ContractDefinition) => void
  closeContractDefinitionsModal: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

export class ContractDefinitionsModal extends React.Component<AllProps> {

  static defaultProps = {
    item: defaultContractDefinition
  }
  compiler: any

  componentDidMount() {
    // this.compiler = solc.compile
    const sourceCode = `
    pragma solidity ^0.5.8;

    contract SimpleStorage {
        
        uint256 value;
        
        constructor() public {
            value = 1000;
        }
        
        function getValue(uint256 newValue) public view returns(uint256){
            if(newValue > 100){
                return newValue;
            }
            return value;
        }
    }`
    // this.sourceCodeIsValid(sourceCode, 'SimpleStorage.sol')
    // TODO.. I'm not sure how this part works, is like I need to cache the usage
    // of my module. Not sure if webpack is doing code splitting.
  }

  sourceCodeIsValid = (sourceCode: string, name: string) => {
    const inputObject: any = {}
    inputObject[`${name}`] = {
      content: sourceCode
    }
    const input = simpleCompilerInput(inputObject, { optimize: true })
    const result = JSON.parse(this.compiler(input))
    return result.errors === undefined
  }

  submit = (item: ContractDefinition) => {
    console.log('save Contract', item)
    const newItemWithSampleData = { // TODO: TO COMPILE OR STORE COMPILATION SOMEWHERE
      ...item,
      abi: [],
      bytecode: '0x000'
    }
    this.props.createOrUpdateContractDefinition(newItemWithSampleData)
  }

  render() {
    return (
      <ContractDefinitionModalComponent
        formId={FORM_ID}
        title={FORM_TITLE}
        visible={this.props.visible}
        loading={this.props.loading}
        initialValues={this.props.item}
        onSubmit={this.submit}
        onCancel={this.props.closeContractDefinitionsModal}
        validator={(items: ContractDefinition) => {
          console.log('Validator called')
          // TODO REVIEW
          const errors: FormikErrors<ContractDefinition> = {}
          if (!items.name) {
            errors.name = 'Required'
          }
          // if (!items.address) {
          //   errors.address = 'Required'
          // }
          if (!items.sourceCode) {
            errors.sourceCode = 'Required'
          }

          if (items.name && items.sourceCode && !this.sourceCodeIsValid(items.sourceCode, items.name)) {
            errors.sourceCode = 'Invalid solidity code'
          }

          return errors
        }}
        FormComponent={({ onSubmit }) => (
          <Form id={FORM_ID} onSubmit={onSubmit}>
            <Field
              name="name"
              render={(innerProps: FieldProps) => <InputFormItem {...innerProps} label="Name" placeHolder="Contract.Sol" />}
            />
            {/* <Field
              name="address"
              render={(innerProps: FieldProps) => (
                <InputFormItem {...innerProps} label="Address" placeHolder="0xAC716460A84B85d774bEa75666ddf0088b024741" />
              )}
            /> */}
            <Field
              name="type"
              render={(innerProps: FieldProps) => (
                <RadioField options={defaultRadioFormOptions} defaultValue="sourcecode" label="From" {...innerProps} />
              )}
            />
            <Field
              name="sourceCode"
              render={(innerProps: FieldProps) => (
                <TextAreaFormItem label="Source code" placeHolder="pragma solidity ^0.5.8" {...innerProps} />
              )}
            />
          </Form>
        )}
      />
    )
  }
}

const mapStateToProps = ({ contractDefinitionState }: ApplicationState) => {
  return {
    visible: contractDefinitionState.contractDefinitionModalOpen,
    submitted: contractDefinitionState.createContractDefinitionStatus === Status.Completed,
    loading: contractDefinitionState.createContractDefinitionStatus === Status.InProgress
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createOrUpdateContractDefinition,
      closeContractDefinitionsModal
    },
    dispatch
  )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(ContractDefinitionsModal)
