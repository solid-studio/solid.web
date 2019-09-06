import React from 'react'

import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { FormikErrors, Field, FieldProps } from 'formik'

import { ApplicationState } from '../../rootReducer';
import { InputFormItem } from '../../../components'
import { Status } from "../../common/types" // TODO: this shouldn't be the case with Sagas

import { createOrUpdateConnection, createConnectionCancelled } from '../actions'
import { Connection, CreateConnection } from '../types'

import { ConnectionModalComponent } from "./ConnectionModalComponent";

const FORM_ID = 'CONNECTION_FORM'
const FORM_TITLE = "Add Connection"

const defaultConnection: Connection = {
  name: '',
  url: ''
}

interface OwnProps {
  item: Connection
}

interface StateProps {
  visible: boolean
  loading: boolean
  submitted: boolean
  createConnection: CreateConnection
}

interface DispatchProps {
  createOrUpdateConnection: (item: Connection) => void
  createConnectionCancelled: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

export class ConnectionModal extends React.Component<AllProps> {

  static defaultProps = {
    item: defaultConnection
  }

  saveConnection = (item: Connection) => {
    this.props.createOrUpdateConnection(item)
  }

  render() {
    return (
      <ConnectionModalComponent
        formId={FORM_ID}
        title={FORM_TITLE}
        visible={this.props.visible}
        loading={this.props.loading}
        initialValues={this.props.item}
        onSubmit={this.saveConnection}
        onCancel={this.props.createConnectionCancelled}
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

const validator = (items: Connection) => {
  const errors: FormikErrors<Connection> = {}
  if (!items.name) {
    errors.name = 'Required'
  }
  if (!items.url) {
    errors.url = 'Required'
  }
  return errors
}

const mapStateToProps = ({ connectionState }: ApplicationState) => {
  console.log("STATE", connectionState)
  return {
    createConnection: connectionState.createConnection,
    visible: connectionState.createConnection.status === Status.Started,
    submitted: connectionState.createConnection.status === Status.Completed,
    loading: connectionState.createConnection.status === Status.InProgress
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createOrUpdateConnection,
      createConnectionCancelled
    },
    dispatch
  )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionModal)
