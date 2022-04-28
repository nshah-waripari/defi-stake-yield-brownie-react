/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import  brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import weth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet/YourWallet"
import { makeStyles, Snackbar, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Alert } from "@material-ui/lab"
import { TokenFarmContract } from "./tokenFarm"
import { UserTotalValue } from "./tokenFarm/UserTotalValue"

export type Token = {
    image: String,
    address: String,
    name: String
}
const useStyles = makeStyles((theme) =>({
    title:{
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
        
    }   
}))
export const Main = () => {
    // Show token value from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet
    // Send brownie-config to 'src' folder
    // send the build folder
    const classes = useStyles()
    const { chainId, error} = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // console.log(chainId)
    console.log(networkName)
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    console.log(dappTokenAddress)
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero 
    console.log(wethTokenAddress)
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero 
    console.log(fauTokenAddress)
    const daiTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero 
    
    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"

        },
        {
            image: weth,
            address: wethTokenAddress,
            name: "WETH"

        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "FAU"

        }        

    ]

    const [showNetworkError, setShowNetworkError] = useState(false)

    const handleCloseNetworkError = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) => {
        if (reason === "clickaway"){
            return
        }
        showNetworkError && setShowNetworkError(false)
    }

    useEffect(()=>{
        if(error && error.name == "UnsupportedChainIdError") {
            !showNetworkError && setShowNetworkError(true)
        } else {
            showNetworkError && setShowNetworkError(false)
        }
    }, [error, showNetworkError])
    

    return (
        <>
            <Typography
             variant="h2"
             component="h1"
             classes = {{
                root: classes.title
             }}>
                 Dapp Token App
             </Typography>
             
            <YourWallet supportedTokens={supportedTokens}/>
            <TokenFarmContract supportedTokens={supportedTokens}/>
            {/* <UserTotalValue/> */}
            <Snackbar
                open={showNetworkError}
                autoHideDuration={5000}
                onClose={handleCloseNetworkError}
            >
                <Alert onClose={handleCloseNetworkError} security="warning">
                    You can connect to the Kovan network only!
                </Alert>
            </Snackbar>
        </>
    )


}