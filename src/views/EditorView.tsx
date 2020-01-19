import React from 'react'

import MonacoEditor from 'react-monaco-editor'
import { connect } from 'react-redux'

import { Contract } from '@solid-explorer/types'

import { ApplicationState } from 'features/rootReducer'
import { ContractDetails } from 'features/contracts/components'

import { Wrapper, Editor, Details } from "./components";

interface Props {
    selectedContract?: Contract
    readOnly?: boolean
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

export class EditorView extends React.Component<Props, State> {
    private editor = null
    private child: {
        console?: Console
    } = {}

    constructor(props: Props) {
        super(props)
        this.state = {
            editor: undefined,
            code: ''
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

    echo = (text: string) => {
        ; (this.child as any).console.log(text)
    }

    promptLabel = () => {
        return '> '
    }

    render() {
        const { selectedContract, readOnly } = this.props
        return (<Wrapper data-testid="editor-view" >
            <Editor>
                <MonacoEditor
                    language="solidity"
                    theme="vs-dark"
                    value={selectedContract && selectedContract.sourceCode}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </Editor>
            {/* <Results>
                <SolidTerminal />
            </Results> */}
            <Details>
                {selectedContract && (
                    <ContractDetails contract={selectedContract} readOnly={readOnly} />
                )}
            </Details>
        </Wrapper >)
    }
}


const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedContract: state.contractState.currentContract
    }
}

export default connect(
    mapStateToProps,
    null
)(EditorView)
