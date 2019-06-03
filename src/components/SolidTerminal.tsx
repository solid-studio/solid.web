import React from "react"

import Terminal from 'react-console-emulator';

import styled from 'styled-components';

interface Props {

}

const commands = {
    echo: {
        description: 'Echo a passed string.',
        usage: 'echo <string>',
        fn: function () {
            return `${Array.from(arguments).join(' ')}`
        }
    }
}

const StyledTerminal = styled(Terminal)`
    min-height: 100% !important;
`

export const SolidTerminal: React.FC<Props> = () => {
    return <StyledTerminal
        promptLabelColor="#DF1A7A"
        promptTextColor="#DF1A7A"
        textColor="#25b864"
        commands={commands}
        welcomeMessage={'Welcome to the Solid Studio Console!'}
        promptLabel={'$'}
    />
}