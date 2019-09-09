import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 20em auto 20em;
  grid-template-rows: 5% 95%;
  grid-row-gap: 0.4px;
  grid-template-areas:
    'header header header'
    'sidebar content content';
`

export const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: #323436;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  display: grid;
  height: 100%;
  grid-template-rows: 50% 50%;
`

export const Content = styled.section`
  grid-area: content;
  background-color: #2a2929;
`
