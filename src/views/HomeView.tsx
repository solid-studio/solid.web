import { Collapse, Icon, Tabs } from 'antd';
import copy from 'copy-to-clipboard';
import React from "react";
import MonacoEditor from 'react-monaco-editor';
import { connect } from "react-redux";
import styled from 'styled-components';
import { ApplicationState } from "../redux/reducers";
import { Contract } from "../redux/types";
import { ContractActions } from '../components/ContractActions';
import { AbiItem } from 'web3-utils';
import { SolidTerminal } from '../components';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 60% auto;
  grid-template-rows: 70% auto;
  grid-row-gap: 0.4px;
  grid-template-areas: 
    "editor details"
    "results details"
`

const Editor = styled.div`
    background-color: #303030;
    grid-area: editor;
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    width: 100%
`

const Details = styled.div`
    background-color: #303030;
    grid-area: details;
    color: white;
    padding: 2em 1em;
`

const Results = styled.div`
    background-color: #303030;
    grid-area: results;
`

interface Props {
    selectedContract: Contract | undefined
}

interface State {
    code: string;
    editor: any;
}

const options = {
    selectOnLineNumbers: true,
    minimap: {
        enabled: false
    },
    scrollbar: {
        vertical: 'hidden' as any
    },
    fixedOverflowWidgets: false,
    scrollBeyondLastLine: false,
    height: "100%",
    width: "100%"
};


const TableDetails = styled.table`
  th { 
    color: white;
    font-size: 1.2em;
    font-weight: 100;
    font-family: 'Helvetica'
  }
  td {
      line-height: 2em;
  }
`

const CollapseStyled = styled(Collapse)`
  margin-top:1em;
`

const SAMPLE_ABI: AbiItem[] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_uuid",
                "type": "string"
            },
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "registryCar",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "cars",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "test",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }
];

export class HomeView extends React.Component<Props, State> {
    private editor = null;
    private child: {
        console?: Console,
    } = {};

    constructor(props: Props) {
        super(props)
        this.state = {
            editor: undefined,
            code: `pragma solidity ^0.5.3;

contract SimpleStorage {
                
uint256 value;
                
    constructor() public {
        value = 1000;
    }
    
    function getValue() public view returns(uint256){
        return value;
    }
}`,
        }
    }

    editorDidMount = (editor: any, monaco: any) => {
        console.log('editorDidMount', editor);
        this.editor = editor;
        editor.focus();
    }

    handleResize = () => {
        if (this.editor) {
            (this.editor as any).layout();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    onChange(newValue: any, e: any) {
        console.log('onChange', newValue, e);
    }
    callback(key: any) {
        console.log(key);
    }

    copyByteCode = (byteCode: string) => {
        console.log("copyByteCode clicked")
        copy(byteCode)
    }

    copyABI = (abi: []) => {
        console.log("copyABI clicked")
        copy(JSON.stringify(abi))
    }

    echo = (text: string) => {
        (this.child as any).console.log(text);
    }
    promptLabel = () => {
        return "> ";
    }
    render() {
        const { selectedContract } = this.props;
        return (
            <Wrapper>
                <Editor>
                    <Tabs type="card" style={{ paddingLeft: "1em", paddingRight: "1em", height: '100%' }} >
                        <TabPane tab={selectedContract && selectedContract.name} key="1" style={{ height: '100%' }}>
                            <MonacoEditor
                                language="solidity"
                                theme="vs-dark"
                                value={selectedContract && selectedContract.sourceCode}
                                options={options}
                                onChange={this.onChange}
                                editorDidMount={this.editorDidMount}
                            />
                        </TabPane>
                    </Tabs>
                </Editor>
                <Results>
                    <SolidTerminal />
                </Results>
                <Details>
                    {selectedContract &&
                        <TableDetails>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedContract.name}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{selectedContract.address}</td>
                                </tr>
                                <tr>
                                    <td>ABI</td>
                                    <td><Icon onClick={() => this.copyABI(selectedContract.abi)} type="copy" /></td>
                                </tr>
                                <tr>
                                    <td>Bytecode</td>
                                    <td><Icon onClick={() => this.copyByteCode(selectedContract.bytecode)} type="copy" /></td>
                                </tr>
                                <tr>
                                    <td>Size </td>
                                    <td>12 KB</td>
                                </tr>
                            </tbody>
                        </TableDetails>}
                    <CollapseStyled defaultActiveKey={['0']} onChange={this.callback} bordered={false}>
                        {selectedContract &&
                            <Panel header="Methods" key="2">
                                <ContractActions abi={SAMPLE_ABI || selectedContract.abi} />
                            </Panel>
                        }
                    </CollapseStyled>
                </Details>
            </Wrapper>
        )
    }
}


const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedContract: state.appState.currentContract
    };
};

export default connect(
    mapStateToProps,
    null
)(HomeView);
