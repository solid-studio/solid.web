import React from 'react'

import Terminal from 'react-console-emulator'

import styled from 'styled-components'

interface Props {
  welcomeMessage?: string;
}

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn() {
      return `${Array.from(arguments).join(' ')}`
    }
  }
}

const StyledTerminal = styled(Terminal)`
  min-height: 100% !important;
`

export const SolidTerminal: React.FC<Props> = ({ welcomeMessage }: Props) => {
  return (
    <StyledTerminal
      promptLabelColor="#DF1A7A"
      promptTextColor="#DF1A7A"
      textColor="#25b864"
      commands={commands}
      welcomeMessage={welcomeMessage || 'Welcome to the Solid Studio Console!'}
      promptLabel={'$'}
    />
  )
}
