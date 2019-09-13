import React from 'react'
import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { FormikErrors, Field, FieldProps } from 'formik'

import { ApplicationState } from '../../rootReducer';
import { InputFormItem } from '../../../components'
import { Status } from "../../common/types" // TODO: this shouldn't be the case with Sagas

import { createOrUpdateContractDefinition, closeContractDefinitionsModal } from '../actions'
import { ContractDefinition } from '../types'

import { ContractDefinitionModalComponent } from "./ContractDefinitionModalComponent";

const FORM_ID = 'CONTRACT_DEFINITION_FORM'
const FORM_TITLE = "Add Contract Definition"

const defaultContractDefinition: ContractDefinition = {
  name: '',
  sourceCode: '',
  abi: [],
  bytecode: ''
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

  submit = (item: ContractDefinition) => {
    this.props.createOrUpdateContractDefinition(item)
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
        validator={validator}
        FormComponent={({ onSubmit }) => (
          <Form id={FORM_ID} onSubmit={onSubmit}>
            <Field
              name="name"
              render={(innerProps: FieldProps) => <InputFormItem {...innerProps} label="Name" placeHolder="http://" />}
            />
            <Field
              name="url"
              render={(innerProps: FieldProps) => (
                <InputFormItem {...innerProps} label="Blockchain URL" placeHolder="JSON RPC endpoint" />
              )}
            />
          </Form>
        )}
      />
    )
  }
}

const validator = (items: ContractDefinition) => {
  const errors: FormikErrors<ContractDefinition> = {}
  // TODO: VALIDATE Properly
  if (!items.name) {
    errors.name = 'Required'
  }

  return errors
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
