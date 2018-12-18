import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Avatar, Badge, Button, Dropdown, Icon, Layout,Menu} from "antd";
import service from "../../axios/Service";
import headIcon from "../../images/head.png";
// @ts-ignore
import Qs from "qs";
const { Header} = Layout;
const styles = (theme: Theme) => createStyles<"header"|"userbox">({
    header: {
        "& .trigger": {
            color: "#fff",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: "45px",
            padding: "0 24px",
            transition: "color .3s",
            verticalAlign: "0.35em"
        },
        "& .ant-badge": {
            marginRight: "20px"
        },
        background: "#458AB6",
        height: "45px",
        padding: 0
    },
    userbox: {
        width: "20vw",
        float: "right",
        lineHeight: "50px",
        textAlign: "right",
        paddingRight: "20px"
    }
});

interface Iprops extends WithStyles<typeof styles> {
    collapsed:boolean,
    toggle: () => void;

}
interface Istates {
    user:string | null;
}
class MyHeader extends React.Component<Iprops,Istates> {
    constructor(props:Iprops){
        super(props);
        this.state={
            user:window.localStorage.getItem("user")
        }
    }
    public render() {
        const {classes} = this.props;
        // 用户头像下拉选项
        const menu = (
            <Menu>
                <Menu.Item>
                    <p
                        onClick={event1 => {
                            service.post(
                                "/login/loginByPhonePwd",
                                Qs.stringify({
                                    phone: "13348916944",
                                    password: "1234"
                                })
                            ).then(() => {
                                // this.setState({
                                //     user:
                                // })
                            });
                        }}
                    >
                        登陆
                    </p>
                </Menu.Item>
            </Menu>
        );
        const hasLogined = (
            <div>
        <span style={{lineHeight: "45px"}}>
          <Badge>
            <Icon
                type="wechat"
                style={{fontSize: "20px", color: "#f0f0f0"}}
            />
          </Badge>
          <Badge count={0}>
            <Icon type="mail" style={{fontSize: "20px", color: "#f0f0f0"}}/>
          </Badge>
        </span>
                <Dropdown overlay={menu}>
                    <Avatar src={headIcon}/>
                </Dropdown>
            </div>
        );
        const noLogined = (
            <Button htmlType={"button"} type="primary">
                登陆
            </Button>
        );
        return (
            <Header className={classes.header}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.props.toggle}
                />
                <div className={classes.userbox}>{this.state.user ? hasLogined : noLogined}</div>
            </Header>
        );
    }
}

export default withStyles(styles)(MyHeader);