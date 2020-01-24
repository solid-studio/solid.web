import React, { PropsWithChildren } from 'react'
import { Layout, Icon } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout;

interface Props {
    collapsed: boolean
    onClose: () => void
}

const SIDER_WIDTH = 500

const CustomIcon = styled(Icon)`
  cursor: pointer;
  color: white;
  padding-right: 0.3em;
`

const SiderHeader = styled.div`
  margin-top: 0.2rem;
  padding: 0 1em 0;
`

export const SiderView: React.FC<Props> = ({ collapsed, onClose, children }: PropsWithChildren<Props>) => {
    return <Sider
        style={{ background: "#272727", display: "flex", flexDirection: "column" }}
        trigger={null}
        collapsed={collapsed}
        collapsible={true}
        collapsedWidth={0}
        width={SIDER_WIDTH}>
        <SiderHeader>
            <CustomIcon type="close" onClick={onClose} />
        </SiderHeader>
        {children}
    </Sider>
}