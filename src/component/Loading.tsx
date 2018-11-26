import { Typography } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {
  StyleRules,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import *as loadable from "react-loadable";

export const styles: StyleRules = {
  root: {},
  process: {
    height: "88vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  sss: {
    position: "fixed"
  }
};

export interface props
  extends WithStyles<typeof styles>,
    loadable.LoadingComponentProps {}

class Loading extends React.Component<props, React.ComponentState> {
  public render() {
    return (
      <div className={this.props.classes.process}>
        <Typography variant="subtitle1" color="inherit" align={"right"}>
          加载中......
        </Typography>
      </div>
    );
  }
}

export default withStyles(createStyles(styles))(Loading);
