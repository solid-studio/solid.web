import React from 'react'
import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'

import { Form } from 'antd'
import { FormikErrors, Field } from 'formik'

import { ConnectionState } from '../reducer'
import { TextField } from '../../../components'

import { Status } from "../../common/types" // TODO: this shouldn't be the case with Sagas

import { createOrUpdateConnection, createConnectionCancelled } from '../actions'
import { Connection, CreateConnection } from '../types'
import { ConnectionModalComponent } from "./ConnectionModalComponent";
import { ApplicationState } from '../../rootReducer';

const FORM_ID = 'CONNECTION_FORM'

interface OwnProps {

}

interface StateProps {
  visible: boolean
  loading: boolean
  submitted: boolean
  createConnection: CreateConnection
}

interface DispatchProps {
  // itemToEdit?: Connection
  createOrUpdateConnection: (item: Connection) => void
  createConnectionCancelled: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

export class ConnectionModal extends React.Component<AllProps> {
  // static defaultProps = {
  //   visible: false,
  //   loading: false    
  // }
  saveConnection = (item: Connection) => {
    // if (this.state.itemToEdit) { // TODO
    //     // update values
    // }
    console.log('save connection', item)
    this.props.createOrUpdateConnection(item)
  }

  render() {
    return (
      <ConnectionModalComponent
        formId={FORM_ID}
        title="Add Connection"
        onSubmit={this.saveConnection}
        visible={this.props.visible}
        loading={this.props.loading}
        onCancel={this.props.createConnectionCancelled}
        initialValues={{ name: '13', url: '', transactionReceipts: [] }}
        validator={(items: Connection) => {
          const errors: FormikErrors<Connection> = {}
          if (!items.name) {
            errors.name = 'Required'
          }
          if (!items.url) {
            errors.url = 'Required'
          }
          return errors
        }}
        FormComponent={({ fields: { name, url }, onSubmit }) => (
          <Form id={FORM_ID} onSubmit={onSubmit}>
            <Field
              name="name"
              render={(innerProps: any) => <TextField {...innerProps} label="Name" placeHolder="http://" />}
            />
            <Field
              name="url"
              render={(innerProps: any) => (
                <TextField {...innerProps} label="Blockchain URL" placeHolder="JSON RPC endpoint" />
              )}
            />
          </Form>
        )}
      />
    )
  }
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
