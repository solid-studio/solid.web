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
import { validateSourceCode } from "../worker-redux/actions";
import { simpleCompilerInput } from "../workers/compiler-worker/compiler-input";
import { solc } from "../utils/compiler";

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
    validateSourceCode: ActionCreator<Action>
    validatingSourceCode: boolean
}

export class ContractModalComponent extends GenericModal<Contract> {

};

// const sourceCodeIsValid = (sourceCode: string, name: string) => {
//     const inputObject: any = {};
//     inputObject[`${name}`] = {
//         content: sourceCode
//     }
//     const input = simpleCompilerInput(inputObject, { optimize: true });
//     const result = JSON.parse(solc.compile(input));
//     console.log("RESULT", result)
//     return result.errors == undefined;
// }
export class ContractModal extends React.Component<Props> {
    compiler: any;

    componentDidMount() {
        this.compiler = solc.compile;
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
        this.sourceCodeIsValid(sourceCode, "SimpleStorage.sol")
        // TODO.. I'm not sure how this part works, is like I need to cache the usage
        // of my module. Not sure if webpack is doing code splitting.
    }

    sourceCodeIsValid = (sourceCode: string, name: string) => {
        const inputObject: any = {};
        inputObject[`${name}`] = {
            content: sourceCode
        }
        const input = simpleCompilerInput(inputObject, { optimize: true });
        const result = JSON.parse(this.compiler(input));
        console.log("RESULT", result)
        return result.errors === undefined;
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
                onSubmit={this.saveContract}
                visible={this.props.visible}
                loading={this.props.loading}
                onCancel={this.props.createContractCancelled}
                disableSubmitButton={this.props.validatingSourceCode}
                initialValues={{ name: "ERC20.sol", sourceCode: "", abi: [], bytecode: "" }}
                validator={(items: Contract) => {
                    console.log("Validator called")
                    const errors: FormikErrors<Contract> = {};
                    if (!items.name) {
                        errors.name = "Required";
                    }
                    if (!items.address) {
                        errors.address = "Required";
                    }
                    if (!items.sourceCode) {
                        errors.sourceCode = "Required";
                    }

                    if (items.name && items.sourceCode && !this.sourceCodeIsValid(items.sourceCode, items.name)) {
                        //&& !sourceCodeIsValid(items.sourceCode, items.name)
                        // const { result, error } = useWorker('./slow_fib.js', 10);
                        // console.log("Result", result, error);
                        // //&& !sourceCodeIsValid(items.sourceCode, items.name)
                        // this.props.validateSourceCode(items.sourceCode);
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
        loading: state.appState.createContract.status === Status.InProgress,
        validatingSourceCode: state.appState.validateSourceCode.status === Status.Started
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            createOrUpdateContract,
            createContractCancelled,
            validateSourceCode
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractModal);