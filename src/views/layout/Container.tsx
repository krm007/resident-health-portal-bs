import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"root">({
    root: {
        height:"90%",
        width:"100%",
    }
});

interface Iprops extends WithStyles<typeof styles> {
}

class Container extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                内容
            </div>
        );
    }
}

export default withStyles(styles)(Container);