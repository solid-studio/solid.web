import React from "react";
import { bindActionCreators, Dispatch, ActionCreator, Action } from "redux";
import { connect } from "react-redux";

import { Form } from "antd";
import { FormikErrors, Field } from "formik";

import { Contract, Status } from "../redux/types";
import { ApplicationState } from "../redux/reducers";
import { createOrUpdateContract, createContractCancelled } from "../redux/actions";
import { GenericModal, TextField, TextAreaField } from "./atoms";
import { ABI, Bytecode } from "./contract-sample-data";

const FORM_TITLE = "ItemForm"; // TODO change to dinamic 

interface Props {
    visible: boolean;
    loading: boolean;
    itemToEdit?: Contract
    createOrUpdateContract: (item: Contract) => void
    createContractCancelled: ActionCreator<Action>
}

export class ContractModalComponent extends GenericModal<Contract> {
    onChange: OnChangeHandler<Contract> = (field, value) => {
        debugger;
        console.log("From contract modal", field, value)
        // OnChangeHandler<FormFields>;
    }
};

type OnChangeHandler<Contract> = <K extends keyof Contract>(
    s: K,
    a: Contract[K]
) => void;

export class ContractModal extends React.Component<Props> {
    onChange = (field: any, value: any) => {
        debugger;
        console.log("From contract modal", field, value)
        // OnChangeHandler<FormFields>;
    }
    saveContract = (item: Contract) => {
        // if (this.state.itemToEdit) { // TODO
        //     // update values
        // }
        console.log("save Contract", item)
        const newItemWithSampleData = {
            ...item,
            abi: ABI as any,
            bytecode: Bytecode
        }
        this.props.createOrUpdateContract(newItemWithSampleData);
    }

    render() {
        return (
            <ContractModalComponent
                title="Add Contract Instance"
                onChange={this.onChange}
                onSubmit={this.saveContract}
                visible={this.props.visible}
                loading={this.props.loading}
                onCancel={this.props.createContractCancelled}
                initialValues={{ name: "ERC20.sol", sourceCode: "", abi: [], bytecode: "" }}
                validator={(items: Contract) => {
                    const errors: FormikErrors<Contract> = {};
                    if (!items.name) {
                        errors.name = "Required";
                    }
                    if (!items.sourceCode) {
                        errors.sourceCode = "Required";
                    }
                    if (compileFunction)
                        return errors;
                }}
                FormComponent={({ fields: { name, sourceCode }, onChange, onSubmit }) => (
                    <Form id={FORM_TITLE} onSubmit={onSubmit}>
                        <Field
                            name="name"
                            render={(innerProps: any) => (
                                <TextField
                                    {...innerProps}
                                    label="Name"
                                    placeHolder="http://" />
                            )}
                        />
                        <Field
                            name="sourceCode"
                            onChange={onChange}
                            render={(innerProps: any) => (
                                <TextAreaField
                                    {...innerProps}
                                    label="Source code"
                                    onChange={this.onChange}
                                    placeHolder="pragma solidity ^0.5.3" />
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
        createContract: state.appState.createContract,
        visible: state.appState.createContract.status === Status.Started,
        submitted: state.appState.createContract.status === Status.Completed,
        loading: state.appState.createContract.status === Status.InProgress
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            createOrUpdateContract,
            createContractCancelled
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractModal);