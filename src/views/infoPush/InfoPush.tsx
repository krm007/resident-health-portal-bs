import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"InfoPush">({
    InfoPush: {}
});

interface Iprops extends WithStyles<typeof styles> {
}

class InfoPush extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.InfoPush}>
                InfoPush
            </div>
        );
    }
}

export default withStyles(styles)(InfoPush);