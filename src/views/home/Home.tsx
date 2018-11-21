import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"home">({
    home: {}
});

interface Iprops extends WithStyles<typeof styles> {
}

class Home extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.home}>
               窝史 Home
            </div>
        );
    }
}

export default withStyles(styles)(Home);