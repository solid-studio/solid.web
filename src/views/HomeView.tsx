import React from "react";
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { bindActionCreators, Dispatch, ActionCreator, Action } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from "../redux/reducers";
import { solc } from "../utils/compiler";
import { Tabs, Icon, Collapse } from 'antd';
import { Contract } from "../redux/types";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

// var input = {
//     language: 'Solidity',
//     sources: {
//         'test.sol': {
//             content: 'import "lib.sol"; contract C { function f() public { L.f(); } }'
//         }
//     },
//     settings: {
//         outputSelection: {
//             '*': {
//                 '*': ['*']
//             }
//         }
//     }
// }

// function findImports(path: string) {
//     if (path === 'lib.sol')
//         return { contents: 'library L { function f() internal returns (uint) { return 7; } }' }
//     else
//         return { error: 'File not found' }
// }

// var output = JSON.parse(solc.compile(JSON.stringify(input), findImports))

// for (var contractName in output.contracts['test.sol']) {
//     console.log(contractName + ': ' + output.contracts['test.sol'][contractName].evm.bytecode.object)
// }

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
`
const Details = styled.div`
    background-color: #303030;
    grid-area: details;
    color: white;
    padding: 0.5em 1em;
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
}

const options = {
    selectOnLineNumbers: true,
    minimap: {
        enabled: false
    },
    scrollbar: {
        vertical: 'hidden' as any
    }
};


const TableDetails = styled.table`
  th { 
    color: white;
    font-size: 1em;
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

export class HomeView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
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

    editorDidMount(editor: any, monaco: any) {
        console.log('editorDidMount', editor);
        editor.focus();
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

    render() {
        const { selectedContract } = this.props;
        return (

            <Tabs type="card" style={{ paddingLeft: "1em", paddingRight: "1em", height: '100%' }} >
                <TabPane tab={selectedContract && selectedContract.name} key="1" style={{ height: '100%' }}>
                    <Wrapper>
                        <Editor>
                            <MonacoEditor
                                height="500"
                                language="solidity"
                                theme="vs-dark"
                                value={selectedContract && selectedContract.sourceCode}
                                options={options}
                                onChange={this.onChange}
                                editorDidMount={this.editorDidMount}
                            />
                        </Editor>
                        <Results>Results</Results>
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
                                            <td>Address</td>
                                            <td>0x692a70d2e424a56d2c6c27aa97d1a86395877b3a</td>
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
                                            <td>Size</td>
                                            <td>12 KB</td>
                                        </tr>
                                    </tbody>
                                </TableDetails>}
                            <CollapseStyled defaultActiveKey={['0']} onChange={this.callback} bordered={false}>
                                <Panel header="Methods" key="2">
                                    <p>text</p>
                                </Panel>
                                <Panel header="Storage" key="3">
                                    <p>text</p>
                                </Panel>
                            </CollapseStyled>
                        </Details>
                    </Wrapper>
                </TabPane>
            </Tabs>



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

// connect
// show current contract
// 