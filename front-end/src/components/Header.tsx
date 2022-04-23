import { useEthers } from "@usedapp/core";
import { Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ( {
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    }
}))

export const Header = () => {
    const {account, activateBrowserWallet, deactivate} = useEthers()
    const classes = useStyles()

    const isConnected = account !== undefined

    return (
        <div className={classes.container}>
            
            { isConnected ? (
                <>
                {/* Display account address [first 4 and last 3 values] */}
                <Button color="primary" variant="contained">
                    {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
                </Button>
                {/* Display connect/disconnect button */}
                <Button color="primary" variant="contained" onClick={deactivate}>
                    Disconnect
                </Button>
                </> 
                ) : (
                    <Button color="primary" variant="contained" onClick={()=> activateBrowserWallet()}>
                        Connect
                    </Button>
                
                )
                
            }
        </div>
    )
}