import React from 'react'

import { Collapse, Icon, Tabs } from 'antd'
import copy from 'copy-to-clipboard'
import MonacoEditor from 'react-monaco-editor'
import { connect } from 'react-redux'

import { ApplicationState } from '../redux/reducers'
import { Contract } from '../features/contracts/types' // TODO: FIX, contract should in contracts
import { ContractActions } from '../features/contracts/ContractActions'
import { SolidTerminal } from '../features/terminal/SolidTerminal'// TODO: fix import

import { Wrapper, Editor, Results, Details, TableDetails, CollapseStyled } from "./components";

import { SAMPLE_ABI, SAMPLE_CONTRACT } from "../sample-data"

const TabPane = Tabs.TabPane
const Panel = Collapse.Panel

interface Props {
    selectedContract: Contract | undefined
}

interface State {
    code: string
    editor: any
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
    height: '100%',
    width: '100%'
}

export class HomeView extends React.Component<Props, State> {
    private editor = null
    private child: {
        console?: Console
    } = {}

    constructor(props: Props) {
        super(props)
        this.state = {
            editor: undefined,
            code: SAMPLE_CONTRACT
        }
    }

    editorDidMount = (editor: any, monaco: any) => {
        console.log('editorDidMount', editor)
        this.editor = editor
        editor.focus()
    }

    handleResize = () => {
        if (this.editor) {
            ; (this.editor as any).layout()
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    onChange(newValue: any, e: any) {
        console.log('onChange', newValue, e)
    }
    callback(key: any) {
        console.log(key)
    }

    copyByteCode = (byteCode: string) => {
        console.log('copyByteCode clicked')
        copy(byteCode)
    }

    copyABI = (abi: []) => {
        console.log('copyABI clicked')
        copy(JSON.stringify(abi))
    }

    echo = (text: string) => {
        ; (this.child as any).console.log(text)
    }

    promptLabel = () => {
        return '> '
    }
    render() {
        const { selectedContract } = this.props
        return (
            <Wrapper>
                <Editor>
                    <Tabs type="card" style={{ paddingLeft: '1em', paddingRight: '1em', height: '100%' }}>
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
                    {selectedContract && (
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
                                    <td>
                                        <Icon onClick={() => this.copyABI(selectedContract.abi)} type="copy" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bytecode</td>
                                    <td>
                                        <Icon onClick={() => this.copyByteCode(selectedContract.bytecode)} type="copy" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Size </td>
                                    <td>12 KB</td>
                                </tr>
                            </tbody>
                        </TableDetails>
                    )}
                    <CollapseStyled defaultActiveKey={['0']} onChange={this.callback} bordered={false}>
                        {selectedContract && (
                            <Panel header="Methods" key="2">
                                <ContractActions abi={SAMPLE_ABI || selectedContract.abi} />
                            </Panel>
                        )}
                    </CollapseStyled>
                </Details>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedContract: state.appState.currentContract
    }
}

export default connect(
    mapStateToProps,
    null
)(HomeView)
