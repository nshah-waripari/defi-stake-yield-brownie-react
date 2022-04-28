import { useCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import {utils, BigNumber, constants, Contract} from "ethers"
import NetworkMapping from "../chain-info/deployments/map.json"

export const useUserTotalValue = (): BigNumber | undefined => {
    const {account, chainId} = useEthers()
    const {abi} = TokenFarm
    
    const tokenFarmContractAddress = chainId? NetworkMapping[String(chainId)]["TokenFarm"][0]: constants.AddressZero
    const tokenFarmInterface =new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmContractAddress, tokenFarmInterface)
    const {value:totalValue} = useCall(
        {
            contract:tokenFarmContract,
            method: "getUserTotalValue",
            args: [account]
        }
    )?? {}
    const newtotalValue = !isNaN(totalValue)? totalValue : 0
    // console.log('Total value: %d', newtotalValue)
    return newtotalValue

    // return  useContractFunction(tokenFarmContract, "getUserTotalValue", {
    //     transactionName: "User Total Value",
    // })    

}

