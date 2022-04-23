import {useContractFunction, useEthers} from "@usedapp/core"
import { BigNumber, constants, utils } from "ethers"
import {Contract} from "@ethersproject/contracts"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import { ERC20 } from "@usedapp/core"
import networkMapping from "../chain-info/deployments/map.json"
import { useEffect, useState } from "react"
export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chain id
    const {chainId} = useEthers()
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0]: constants.AddressZero
    // setup abi and interface for TokenFarm contract
    const {abi} = TokenFarm
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    // setup abi and interface for ERC20 contract
    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const ecr20Contract = new Contract(tokenAddress, erc20Interface)

    // approve token
    //  stake token
    // execute approve function
    const {send: approveErc20Send, state: approveAndStakeErc20State} = useContractFunction(ecr20Contract, "approve", 
    {transactionName: "Approve ERC20 transfer"})
    const approveAndStake = (amount: string) => {
        setAmontToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }
    const [state, setState] = useState(approveAndStakeErc20State)

    const {send: stakeSend, state: stakeState} = useContractFunction(tokenFarmContract, "stakeTokens", 
    {transactionName: "Stake Tokens"})

    const [amountToStake, setAmontToStake] = useState("0")

    
    // useEffect
    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            // stake function
            stakeSend(amountToStake, tokenAddress)

        }
    }, [approveAndStakeErc20State,amountToStake, tokenAddress])

    const [stateApproveStake, setStateStake] = useState(approveAndStakeErc20State)

    useEffect(()=>{
        if(approveAndStakeErc20State.status === "Success"){
            setStateStake(stakeState)
        }else {
            setStateStake(approveAndStakeErc20State)
        }
    }, [approveAndStakeErc20State, stakeState])

    return {approveAndStake, stateApproveStake}
}