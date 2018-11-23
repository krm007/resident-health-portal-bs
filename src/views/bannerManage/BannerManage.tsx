import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Button } from "antd";
import service from "../../axios/Service";

const styles = (theme: Theme) =>
  createStyles<"BannerManage">({
    BannerManage: {}
  });

interface Iprops extends WithStyles<typeof styles> {}

class BannerManage extends React.Component<Iprops> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.BannerManage}>
        图片管理
        <Button
          onClick={() => {
            service.get("/user/getAccountInfo").then(value => {
              alert(JSON.stringify(value.data));
            });
          }}
        >
          请求
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(BannerManage);
