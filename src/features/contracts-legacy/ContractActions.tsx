import React from 'react'
import { AbiItem } from 'web3-utils'

import ContractActionView from './ContractActionView'

interface Props {
    abi: AbiItem[]
}

const processABIData = (abi: AbiItem[]) => {
    const onlyFunctions = abi.filter((item: AbiItem) => {
        console.log('Inside filter', item)
        return item.type === 'function'
    })
    console.log('onlyFunctions', onlyFunctions)
    return onlyFunctions
}

export const ContractActions: React.FC<Props> = (props: Props) => {
    const onlyFunctions = processABIData(props.abi)
    return (
        <div>
            {onlyFunctions &&
                onlyFunctions.length > 0 &&
                onlyFunctions.map(item => <ContractActionView key={item.name} abi={item} />)}
        </div>
    )
}
