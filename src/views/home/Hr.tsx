import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"root">({
    root: {
        width:"30px"
    }
});

interface Iprops extends WithStyles<typeof styles> {
}

class Hr extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <table style={{borderRight: "1px solid rgb(229,229,229)", height: 70}}>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </table>
            </div>);
    }
}

export default withStyles(styles)(Hr);