import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Avatar, Icon, Menu} from 'antd';
import * as React from "react";
import {Link} from "react-router-dom";
import logo from '../../logo.svg'

const SubMenu = Menu.SubMenu;
const styles = (theme: Theme) => createStyles<"menu" | "logoCard">({
    logoCard: {
        float: "left",
        height: "40px",
        width: "100%",
    },
    menu: {
        height: "100vh",

    },
});

interface Iprops extends WithStyles<typeof styles> {
}

interface Istate {
    collapsed: boolean
}

class SideMenu extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.menu}>
                <Avatar src={logo} size={80}/>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="主页">
                        <Link to={"/home"}>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="banner">
                        <Link to={"/bannerManage"}>
                            <Icon type="desktop"/>
                            <span>banner管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="appointment" title={
                        <span>
                        <Icon type="inbox"/>
                        <span>预约挂号管理</span>
                        </span>
                    }>
                        <Menu.Item key="number">
                            <Link to={"/appointment/number"}>
                                <span>号源管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="medicalLib" title={
                        <span>
                        <Icon type="inbox"/>
                        <span>医疗资源字典</span>
                        </span>
                    }>
                        <Menu.Item key="hospitalLib">
                            <Link to={"/medicalLib/hospitalLib"}>
                                <span>医院字典</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="doctor">
                            <Link to={"/medicalLib/doctorLib"}>
                                <span>医生字典</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="infoPush" title={
                        <span>
                        <Icon type="info"/>
                        <span>信息推送</span>
                        </span>
                    }>
                        <Menu.Item key="infoPushNew">
                            <Link to={"/infoPush/infoPushNew"}>
                                <span>新建推送</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="infoPushDetail">
                            <Link to={"/infoPush/infoPushDetail"}>
                                <span>推送详情</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="user" title={
                        <span>
                        <Icon type="user"/>
                        <span>用户管理</span>
                        </span>
                    }>
                        <Menu.Item key="realName">
                            <Link to={"/user/realName"}>
                                <span>实名认证</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="blacklist">
                            <Link to={"/user/blacklist"}>
                                <span>黑名单管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(SideMenu);