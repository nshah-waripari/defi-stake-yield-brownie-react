import { useCall, useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import {utils, BigNumber, constants, Contract} from "ethers"
import NetworkMapping from "../chain-info/deployments/map.json"

export const useStakingBalance = (address: string): BigNumber | undefined => {
    const {account, chainId} = useEthers()
    const {abi} = TokenFarm
    const tokenFarmContractAddress = chainId? NetworkMapping[String(chainId)]["TokenFarm"][0]: constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmContractAddress, tokenFarmInterface)
    
    // const [stakingBalance] = useContractCall({
    //     abi: tokenFarmInterface,
    //     address: tokenFarmContractAddress,
    //     method: "stakingBalance",
    //     args: [address, account]
    // }) ?? []

    // const [stakingBalance1] = useCall(tokenFarmContract, {})
    const {value:stakeBalance} = useCall(
        {
            contract:tokenFarmContract,
            method: "stakingBalance",
            args: [address, account]
        }
    )?? {}
    return stakeBalance

}

