import { formatUnits } from "@ethersproject/units"
import { useUserTotalValue } from "../../hooks/useUserTotalValue"
import { Typography, makeStyles, Button } from "@material-ui/core"

const useStyles = makeStyles((theme)=> ({
   container: {
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "150px"
   }, 
}))

export const UserTotalValue = () => {
    const classes = useStyles()    
    // const {notifications} = useNotifications()
    const totalValue = useUserTotalValue()
    console.log("User Total Value:")
    console.log(totalValue)
    const formattedTotalValue: number = totalValue ? parseFloat(formatUnits(totalValue.toString(), 18)) : 0


     return (
        <div className={classes.container}>
            <Typography variant="h6" component="span">
                Your total staked value is: {formattedTotalValue}
            </Typography>
        </div>
    )

}