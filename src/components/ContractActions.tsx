import React from "react";

import { Input, Button, Tag } from "antd";
import { AbiItem, AbiInput, AbiOutput } from "web3-utils";
import styled from "styled-components";

interface Props {
    abi: AbiItem[]
}

const InputGroup = Input.Group;

const processABIData = (abi: AbiItem[]) => {
    const onlyFunctions = abi.filter((item: AbiItem) => {
        console.log("Inside filter", item)
        return item.type === "function"
    })
    console.log("onlyFunctions", onlyFunctions)
    return onlyFunctions;
}

const StyledInput = styled(Input)`
    display: block;
    margin-top: 1em;
    font-size: 0.8em;
`

const StyledInputGroup = styled(InputGroup)`
display: flex;
flex-direction: column;
justify-content: space-between;
`

const StyledButton = styled(Button)`
    height: 26px;
    font-size: 0.8em;
    margin-top: 1em;
    width: 7em;
`
const Container = styled.div`
    margin: 0;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-bottom: 1em;
    border-bottom: 0.1px solid #3e3e3e;
    padding-bottom: 1em;
`

export const ContractActions: React.FC<Props> = (props: Props) => {
    const onlyFunctions = processABIData(props.abi);
    return (<div>
        {onlyFunctions && onlyFunctions.length > 0 &&
            onlyFunctions.map((item) => <ContractView key={item.name} abi={item} />)
        }
    </div>)
}

interface ContractViewProps {
    abi: AbiItem
}

const MapInputs = (input: AbiInput[] | undefined): string => {
    if (!input) {
        return ""
    }
    const result = input.reduce((previous: any, current: AbiInput, index: number) => {
        return index === 0 ? `${current.type} ${current.name}` : `${previous}, ${current.type} ${current.name}`
    }, '')
    return result;
}

const MapOutputs = (output: AbiOutput[] | undefined): string => {
    if (!output) {
        return ""
    }
    const result = output.reduce((previous: any, current: AbiInput, index: number) => {
        return index === 0 ? `${current.type} ${current.name}` : `${previous}, ${current.type} ${current.name}`
    }, '')
    return result;
}

const isReadOnlyFunction = (abi: AbiItem | undefined) => {
    if (!abi || !abi.stateMutability) {
        return true;
    }
    const readOnlyModifiers = ["pure", "view", "constant"];
    return readOnlyModifiers.indexOf(abi.stateMutability) > -1;
}

const ContractView: React.FC<ContractViewProps> = (props: ContractViewProps) => {
    const { abi } = props;
    const { name, inputs, outputs } = abi;
    const inputStrings = MapInputs(inputs);
    const outputStrings = MapOutputs(outputs);
    return (
        <Wrapper>
            <Container style={{ marginTop: "0" }}>
                <Tag color="blue">function</Tag><p style={{ color: 'white', margin: "0", display: "inline", fontSize: "0.9em" }}>{name}<span>({inputStrings.trim()}): returns ({outputStrings})</span></p>
            </Container>
            <Container>
                <StyledInputGroup>
                    {inputs && inputs.map((item, index) => {
                        return <StyledInput key={index} size="small" style={{ width: '35%' }} type="text" placeholder={`${item.type} ${item.name}`} />
                    })}
                </StyledInputGroup>
            </Container>
            <Container>
                <StyledButton type="primary">{isReadOnlyFunction(abi) ? "Call" : "Send"}</StyledButton>
            </Container>
        </Wrapper>
    )
}