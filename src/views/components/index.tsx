import styled from 'styled-components'

import { Collapse } from 'antd'

export const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 60% auto;
  grid-template-rows: 70% auto;
  grid-row-gap: 0.4px;
  grid-template-areas:
    'editor details'
    'results details';
`

export const Editor = styled.div`
  background-color: #303030;
  grid-area: editor;
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  width: 100%;
`

export const Details = styled.div`
  background-color: #303030;
  grid-area: details;
  color: white;
  padding: 2em 1em;
`

export const Results = styled.div`
  background-color: #303030;
  grid-area: results;
`

export const TableDetails = styled.table`
  th {
    color: white;
    font-size: 1.2em;
    font-weight: 100;
    font-family: 'Helvetica';
  }
  td {
    line-height: 2em;
  }
`

export const CollapseStyled = styled(Collapse)`
  margin-top: 1em;
`


export const StyledDiv = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
`

export const StyledH1 = styled.h1`
    margin-bottom: 1rem;
`