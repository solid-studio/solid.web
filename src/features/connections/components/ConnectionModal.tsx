import React from 'react'

import { bindActionCreators, Dispatch, ActionCreator, Action } from 'redux'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { FormikErrors, Field, FieldProps } from 'formik'
import axios from 'axios'
import { Connection } from '@solid-explorer/types'

import { ApplicationState } from '../../rootReducer';
import { InputFormItem } from '../../../components'
import { Status } from "../../common/types" // TODO: this shouldn't be the case with Sagas

import { createOrUpdateConnection, closeConnectionModal } from '../actions'

import { ConnectionModalComponent } from "./ConnectionModalComponent";
import { RadioField } from './RadioField'
import { ConnectionType, PublicChainId } from '@solid-explorer/types/lib/connections/ConnectionType'
import { SelectField } from './SelectField'

const FORM_ID = 'CONNECTION_FORM'
const FORM_TITLE = "Add Connection"

const defaultConnection: Connection = {
  name: '',
  url: '',
  type: ConnectionType.Private,
  publicChainId: PublicChainId.Goerli
}

const defaultRadioFormOptions = [
  {
    key: ConnectionType.Private,
    value: ConnectionType.Private
  },
  {
    key: ConnectionType.Public,
    value: ConnectionType.Public
  }
]

const defaultPublicChainFormOptions = [
  {
    key: PublicChainId.Goerli,
    value: PublicChainId.Goerli
  },
  {
    key: PublicChainId.MainNet,
    value: PublicChainId.MainNet
  },
  {
    key: PublicChainId.XDai,
    value: PublicChainId.XDai
  }
]

interface OwnProps {
  item: Connection
}

interface StateProps {
  visible: boolean
  loading: boolean
  submitted: boolean
}

interface DispatchProps {
  createOrUpdateConnection: (item: Connection) => void
  closeConnectionModal: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

export class ConnectionModal extends React.Component<AllProps> {

  static defaultProps = {
    item: defaultConnection
  }

  saveConnection = async (item: Connection, actions: any) => {
    console.log("ITEM", item)
    console.log("ACTIONS", actions)
    const isValid = await isValidConnection(item.url)
    if (!isValid) {
      actions.setSubmitting(true)
      actions.setFieldError('url', 'Invalid JSON RPC URL')
    } else {
      // TODO test.. to avoid store data that can confuse...
      const itemCleaned: Connection = item.type === ConnectionType.Private ? { ...item, publicChainId: undefined } : { ...item, url: '' }
      this.props.createOrUpdateConnection(itemCleaned)
    }
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
        onCancel={this.props.closeConnectionModal}
        validator={validator}
        FormComponent={({ onSubmit }) => (
          <Form id={FORM_ID} onSubmit={onSubmit}>
            <Field
              name="name"
              render={(innerProps: FieldProps) => <InputFormItem {...innerProps} label="Name" placeHolder="name" />}
            />
            <Field
              name="type"
              render={(innerProps: FieldProps) => (
                <RadioField isButton={true} options={defaultRadioFormOptions} defaultValue={ConnectionType.Private} label="Type" {...innerProps} />
              )}
            />
            <Field
              name="publicChainId"
              as="select"
              render={(innerProps: FieldProps) => (
                <SelectField {...innerProps} options={defaultPublicChainFormOptions} label="Public network" />
              )}
            />
            <Field
              name="url"
              render={(innerProps: FieldProps) => {
                const isPrivate = innerProps.form.values.type === ConnectionType.Private
                return isPrivate ? <InputFormItem {...innerProps} label="Blockchain URL" placeHolder="JSON RPC endpoint" /> : <div></div>
              }}
            />
          </Form>
        )}
      />
    )
  }
}

// TODO TO MOVE
const isValidConnection = async (url: string) => {
  try {
    const result = await axios.post(url, '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}')
    return result.data;
  } catch (error) {
    return undefined;
  }
}

const validator = (items: Connection): FormikErrors<Connection> => {
  const errors: FormikErrors<Connection> = {}
  console.log("ITEMS", items)
  if (!items.name) {
    errors.name = 'Required'
  }
  if (!items.url) {
    errors.url = 'Required'
  }
  if (items.type === ConnectionType.Public && !items.publicChainId) {
    errors.publicChainId = 'Required'
  }
  return errors
}

const mapStateToProps = ({ connectionState }: ApplicationState) => {
  return {
    visible: connectionState.connectionModalOpen,
    submitted: connectionState.createConnectionStatus === Status.Completed,
    loading: connectionState.createConnectionStatus === Status.InProgress
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createOrUpdateConnection,
      closeConnectionModal
    },
    dispatch
  )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionModal)
