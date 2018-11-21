import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"BannerManage">({
    BannerManage: {}
});

interface Iprops extends WithStyles<typeof styles> {
}

class BannerManage extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.BannerManage}>
                BannerManage
            </div>
        );
    }
}

export default withStyles(styles)(BannerManage);