import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";

const styles = (theme: Theme) => createStyles<"root">({
    root: {}
});

interface Iprops extends WithStyles<typeof styles> {
}

class AddHos extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (<div className={classes.root}>新增医院字典。。。</div>);
    }
}

export default withStyles(styles)(AddHos);