import React from 'react'
import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'

import { Form } from 'antd'
import { FormikErrors, Field } from 'formik'

import { Connection, Status } from '../redux/types'
import { ApplicationState } from '../redux/reducers'
import { createOrUpdateConnection, createConnectionCancelled } from '../redux/actions'
import { GenericModal, TextField } from './atoms'

const FORM_TITLE = 'ItemForm' // TODO change to dinamic

interface Props {
  visible: boolean
  loading: boolean
  itemToEdit?: Connection
  createOrUpdateConnection: (item: Connection) => void
  createConnectionCancelled: ActionCreator<Action>
  // onCancel: () => void
}

export class ConnectionModalComponent extends GenericModal<Connection> {}

export class ConnectionModal extends React.Component<Props> {
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
          <Form id={FORM_TITLE} onSubmit={onSubmit}>
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

const mapStateToProps = (state: ApplicationState) => {
  return {
    createConnection: state.appState.createConnection,
    visible: state.appState.createConnection.status === Status.Started,
    submitted: state.appState.createConnection.status === Status.Completed,
    loading: state.appState.createConnection.status === Status.InProgress
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionModal)
