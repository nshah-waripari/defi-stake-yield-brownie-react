import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import { utils, constants } from "ethers"
import {Contract} from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"

export const useUnstakeTokens = () => {
    const {chainId} = useEthers()
    const {abi} = TokenFarm
    const tokenFarmAddress = chainId? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    return useContractFunction(tokenFarmContract, "unstakeTokens", {
        transactionName: "Unstake tokens",
    })
}
