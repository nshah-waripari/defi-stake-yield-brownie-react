import { formatUnits } from "@ethersproject/units"
import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { Alert } from "@material-ui/lab"
import { ethers } from "@usedapp/core/node_modules/ethers"
import { useEffect, useState } from "react"
import { useStakeTokens } from "../../hooks/useStakeToken"
import { Token } from "../Main"
import {utils} from "ethers"

export interface StakeFormProps {
    token: Token
}
export const StakeForm = ({token}: StakeFormProps) => {
    const {address: tokenAddress, name} = token
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress?.toString(), account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const {notifications}  = useNotifications()
    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value == "" ? "": Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const {approveAndStake, stateApproveStake: approveAndStakeErc20State} = useStakeTokens(tokenAddress.toString())
    const isMining = approveAndStakeErc20State.status === "Mining" 
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowErc20ApprovalSuccess(false)
        setShowStakeTokenSuccess(false)
    }
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    useEffect(()=> {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" && 
                notification.transactionName === "Approve ERC20 transfer"
                ).length > 0) {
                    console.log("Approved!")
                    setShowErc20ApprovalSuccess(true)
                    setShowStakeTokenSuccess(false)
                }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" && 
                notification.transactionName === "Stake Tokens"
            ).length > 0) {
            console.log("Tokens Staked!")
            setShowErc20ApprovalSuccess(false)
            setShowStakeTokenSuccess(true)

        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess])

    return (
        <>
            <div>
            <Input onChange={handleInputChange}/>
            <Button
            onClick={handleStakeSubmit}
            color="primary"
            size="large"
            disabled={isMining}
            >{isMining ? <CircularProgress size={26}/>: "Stake!!"}
            </Button>
            </div>
            <Snackbar
                open={showErc20ApprovalSuccess}
                autoHideDuration={500}
                onClose={handleCloseSnack}
                >
                 <Alert onClose={handleCloseSnack} severity="success">
                     ERC-20 token transfer approved! Now approve the second transaction.
                 </Alert>
            </Snackbar>
            <Snackbar
                open={showStakeTokenSuccess}
                autoHideDuration={500}
                onClose={handleCloseSnack}
                >
                 <Alert onClose={handleCloseSnack} severity="success">
                     Token Staked! 
                 </Alert>
            </Snackbar>

        </>
    )
}