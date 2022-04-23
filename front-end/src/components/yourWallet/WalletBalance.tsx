import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {Token} from "../Main"
import { BalanceMsg} from "./BalanceMsg"

export interface WalletBalanceProps {
    token: Token
}
export const WalletBalance = ({token}: WalletBalanceProps) => {
    const {image, address, name } = token
    const {account} = useEthers()
    // const address1 = '0x75b224Fbbe1618Ceb9CB6dE0ADe0B30bcd6AA6B4'
    // const account1 = '0xef9a20A1C926b2bA9AEb9991325aA898eE954Aa7'
    const tokenBalance = useTokenBalance(address?.toString(), account)
    // console.log(image)
    // console.log(name)
    // console.log(address)    
    // console.log(account)
    // console.log(tokenBalance?.toString())
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label = {`Your un-staked ${name} balance`}
        tokenImgSrc = {image}
        amount = {formattedTokenBalance}/>
        
        )
}