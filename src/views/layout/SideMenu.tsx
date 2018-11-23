import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Avatar, Icon, Menu} from 'antd';
import * as React from "react";
import {Link} from "react-router-dom";
import logo from '../../logo.svg'

// const SubMenu = Menu.SubMenu;
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
                    <Menu.Item key="appointment">
                        <Link to={"/appointment"}>
                            <Icon type="inbox"/>
                            <span>预约挂号管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="medicalLib">
                        <Link to={"/medicalLib"}>
                            <Icon type="inbox"/>
                            <span>医疗资源字典</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="info">
                        <Link to={"/infoPush"}>
                            <Icon type="inbox"/>
                            <span>信息推送</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Link to={"/user"}>
                            <Icon type="inbox"/>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    {/*<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>*/}
                    {/*<Menu.Item key="9">Option 9</Menu.Item>*/}
                    {/*<Menu.Item key="10">Option 10</Menu.Item>*/}
                    {/*<SubMenu key="sub3" title="Submenu">*/}
                    {/*<Menu.Item key="11">Option 11</Menu.Item>*/}
                    {/*<Menu.Item key="12">Option 12</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(SideMenu);