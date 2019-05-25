import { Form } from "antd";
import { Field, FormikErrors } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Action, ActionCreator, bindActionCreators, Dispatch } from "redux";
import { createContractCancelled, createOrUpdateContract } from "../redux/actions";
import { ApplicationState } from "../redux/reducers";
import { Contract, Status } from "../redux/types";
import { GenericModal, RadioField, TextAreaField, TextField } from "./atoms";
import { ABI, Bytecode } from "./contract-sample-data";

const FORM_TITLE = "ItemForm"; // TODO change to dinamic 
const radioFromOptions = [
    {
        "key": "sourcecode",
        "value": "Source Code",
    },
    {
        "key": "abi",
        "value": "ABI"
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

// {
//     'test.sol': {
//         content: 'contract C { function f() public { } }'
//     }
// },



const sourceCodeIsValid = (sourceCode: string, name: string) => {
    console.log("sourceCodes", sourceCode, name);
    //const appWorker = new CompilerWorker();
    // let appWorker;
    // appWorker = new Worker('./compiler.worker.js')

    // // const { result, error } = useWorker('./slow_fib.js', 10);
    // if ((window as any).Worker) {
    //     console.log("worker supported");
    //     appWorker.onmessage = function (e) {
    //         console.log("Message received", e)
    //         switch (e.data.event) {
    //             case '1':
    //                 return "1";
    //             case '2':
    //                 return "2";
    //             case '3':
    //                 return "3";
    //             default:
    //                 console.warn('WORKER', 'No appropriate handler was found')
    //         }
    //     }
    //     appWorker.postMessage("Hello World");
    // }

    // console.log("here")
    // const inputObject: any = {};
    // inputObject[`${name}`] = {
    //     content: sourceCode
    // }
    // const input = simpleCompilerInput(inputObject, { optimize: true });
    // const result = JSON.parse(solc.compile(input))
    // console.log("RESULT", result)

    // const worker = new Worker();

    // worker.postMessage({ a: 1 });
    // worker.onmessage = (event) => { };

    // worker.addEventListener("message", (event) => { });
    return true;
}

export class ContractModalComponent extends GenericModal<Contract> {

};

// let appWorker

//     appWorker = new Worker('../utils/compiler.js')


// }

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

                    if (items.name && items.sourceCode && !sourceCodeIsValid(items.sourceCode, items.name)) {
                        // const { result, error } = useWorker('./slow_fib.js', 10);
                        // console.log("Result", result, error);
                        // //&& !sourceCodeIsValid(items.sourceCode, items.name)
                        errors.sourceCode = "Invalid solidity code";
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
                                    defaultValue="sourcecode"
                                    label="From" />
                            )}
                        />
                        <Field
                            name="sourceCode"
                            render={(innerProps: any) => (
                                <TextAreaField
                                    {...innerProps}
                                    label="Source code"
                                    placeHolder="pragma solidity ^0.5.8" />
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