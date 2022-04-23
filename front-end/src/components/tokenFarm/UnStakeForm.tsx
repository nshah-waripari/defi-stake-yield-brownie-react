import React, {useState, useEffect} from "react"
import {
    Button,
    CircularProgress,
    Snackbar,
    makeStyles,
} from "@material-ui/core"
import {Token} from "../Main"
import { useUnstakeTokens, useStakingBalance } from "../../hooks"
import { Alert } from "@material-ui/lab"
import { useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../yourWallet/BalanceMsg"

export interface UnstakeFormProps {
    token: Token
}

const useStyles = makeStyles((theme)=> ({
   contentContainer:{
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       justifyContent: "flex-start",
       gap: theme.spacing(2)
        
   }, 
}))

export const Unstake = ({token}: UnstakeFormProps) => {
    const {image, address:tokenAddress, name} = token
    const {notifications} = useNotifications()
    const balance = useStakingBalance(tokenAddress.toString())
    console.log('balance:', balance)
    const formattedBalance: number = balance ? parseFloat(formatUnits(balance.toString(), 18)) : 0
    const {send:unstakeTokensSend, state: unstakeTokenState} = useUnstakeTokens()
    
    const handleUnstakeTokenSubmit= () => {
        return unstakeTokensSend(tokenAddress)
    }

    const [showUnstakeSucess, setShowUnstakeSucess] = useState(false)

    const handleCloseSnack = () => {
        showUnstakeSucess && setShowUnstakeSucess(false)
    }

    useEffect(() => {
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Unstake tokens"
            ).length > 0
        ) {
            !showUnstakeSucess && setShowUnstakeSucess(true)
        }
    }, [notifications, showUnstakeSucess])


    const isMining = unstakeTokenState.status === "Mining"

    const classes = useStyles()

    return (
        <>
         <div className={classes.contentContainer}>
             <BalanceMsg
                label={`Your staked ${name} balance`}
                amount={formattedBalance}
                tokenImgSrc={image}/>
            <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleUnstakeTokenSubmit}
                disabled={isMining}>
                   {isMining ? <CircularProgress size={26}/>: `Unstake all ${name}`} 
            </Button>
         </div>
         <Snackbar
            open={showUnstakeSucess}
            autoHideDuration={5000}
            onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} security="success">
                    Tokens unstaked successfully!
                </Alert>
        </Snackbar>
        </>
    )

}