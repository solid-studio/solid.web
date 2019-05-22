import React from "react";
import { bindActionCreators, Dispatch, ActionCreator, Action } from "redux";
import { connect } from "react-redux";

import { Form } from "antd";
import { FormikErrors, Field } from "formik";

import { Contract, Status } from "../redux/types";
import { ApplicationState } from "../redux/reducers";
import { createOrUpdateContract, createContractCancelled } from "../redux/actions";
import { GenericModal, TextField, TextAreaField, RadioField } from "./atoms";
import { ABI, Bytecode } from "./contract-sample-data";

const FORM_TITLE = "ItemForm"; // TODO change to dinamic 
const radioFromOptions = [
    {
        "key": "abi",
        "value": "ABI"
    },
    {
        "key": "sourcecode",
        "value": "Source Code",
    },
    {
        "key": "bytecode",
        "value": "Bytecode"
    },
    {
        "key": "contract",
        "value": "Contract"
    },
]
interface Props {
    visible: boolean;
    loading: boolean;
    itemToEdit?: Contract
    createOrUpdateContract: (item: Contract) => void
    createContractCancelled: ActionCreator<Action>
}

export class ContractModalComponent extends GenericModal<Contract> {

};

// type OnChangeHandler<Contract> = <K extends keyof Contract>(
//     s: K,
//     a: Contract[K]
// ) => void;

export class ContractModal extends React.Component<Props> {
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
                onSubmit={this.saveContract}
                visible={this.props.visible}
                loading={this.props.loading}
                onCancel={this.props.createContractCancelled}
                initialValues={{ name: "ERC20.sol", sourceCode: "", abi: [], bytecode: "" }}
                validator={(items: Contract) => {
                    console.log("Validator called")
                    const errors: FormikErrors<Contract> = {};
                    if (!items.name) {
                        errors.name = "Required";
                    }
                    if (!items.sourceCode) {
                        errors.sourceCode = "Required";
                    }
                    return errors;
                }}
                FormComponent={({ fields: { name, sourceCode }, onSubmit }) => (
                    <Form id={FORM_TITLE} onSubmit={onSubmit}>
                        <Field
                            name="name"
                            render={(innerProps: any) => (
                                <TextField
                                    {...innerProps}
                                    label="Name"
                                    placeHolder="Contract.Sol" />
                            )}
                        />
                        <Field
                            name="address"
                            render={(innerProps: any) => (
                                <TextField
                                    {...innerProps}
                                    label="Address"
                                    placeHolder="0xAC716460A84B85d774bEa75666ddf0088b024741" />
                            )}
                        />
                        <Field
                            name="type"
                            render={(innerProps: any) => (
                                <RadioField
                                    options={radioFromOptions}
                                    {...innerProps}
                                    defaultValue="abi"
                                    label="From" />
                            )}
                        />
                        <Field
                            name="abi"
                            render={(innerProps: any) => (
                                <TextAreaField
                                    {...innerProps}
                                    label="ABI"
                                    placeHolder="Inser a valid ABI" />
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