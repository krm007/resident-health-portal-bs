import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Avatar, Badge, Dropdown, Icon, Layout, Menu} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login} from "../../redux/action/Actions";
import {logOut} from "../../_util/auth";
import {userData} from "../../type/UserInfoData";
// @ts-ignore
import Qs from "qs";
import {Link} from 'react-router-dom';

const {Header} = Layout;
const styles = (theme: Theme) => createStyles<"header" | "userbox" | "avator" | "phone">({
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
        lineHeight: "45px",
        textAlign: "right",
        paddingRight: "30px",
        "& .anticon": {
            verticalAlign: "middle"
        }
    },
    avator: {},
    phone:{
        marginLeft:"5px",
        verticalAlign:"middle",
        color:"#fff"
    }
});

interface Iprops extends WithStyles<typeof styles> {
    user: userData,
    toggle: () => void,
    login: () => void,
    collapsed: any

}

interface Istates {
    phone: string | null;
}

class MyHeader extends React.Component<Iprops, Istates> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            phone: window.localStorage.getItem("phone")
        }
    }

    public UNSAFE_componentWillMount(): void {
        this.props.login()
    }

    public render() {
        const {classes} = this.props;
        // 用户头像下拉选项
        const menu = (
            <Menu>
                {
                    this.state.phone ? (
                        <Menu.Item>
                            <Link to={"/login"}>退出</Link>
                        </Menu.Item>
                    ) : (
                        <Menu.Item>
                            <Link to={"/login"}>登陆</Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        );

        return (
            <Header className={classes.header}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.props.toggle}
                />
                <div className={classes.userbox}>
                    <span style={{lineHeight: "45px"}}>
                      <Badge>
                        <Icon
                            type="wechat"
                            style={{fontSize: "22px", color: "#f0f0f0"}}
                        />
                      </Badge>
                      <Badge count={0}>
                        <Icon type="mail" style={{fontSize: "22px", color: "#f0f0f0"}}/>
                      </Badge>
                    </span>
                    <Dropdown overlay={menu} className={classes.avator}>
                        <Avatar
                            size={"default"}
                            icon={"user"}
                            src={"/api" + this.props.user.avatarUrl}
                        />
                    </Dropdown>
                    <span className={classes.phone}>
                        {this.state.phone ? this.state.phone : "未登录"}
                    </span>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state
            .get("loginOrLogoutReducer") // state.get(XXX)为redux-immutatble内置函数用于获取reducers内部的reducer或store中的数据
            .get("user")
            .toJS()
    }
};
const mapDispatchToProps = ({} = (dispatch: any, ownProps: any) => {
    return bindActionCreators(
        {
            login,
            logOut
        },
        dispatch
    )
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MyHeader));