import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Avatar, Icon, Menu} from 'antd';
import * as React from "react";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";
import logo from '../../logo.svg';
import { urlToList } from '../../_util/pathTool'

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

interface Iprops extends WithStyles<typeof styles>, RouteComponentProps {
}

interface Istate {
    collapsed: boolean,
    openKey:string,
    current: string
}

class SideMenu extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            collapsed: false,
            openKey:"",
            current: '/'
        }

    }

    public componentWillMount() {
        const url = this.props.location.pathname;
        const list = url.split('/')
            .filter(i => i);// 去掉分割后的数组里面的空元素
        if(list.length>1){
            this.setState({
                openKey:list[0]
            })
        }
        const urlList = urlToList(url);
        if(urlList.length === 0){
            this.setState({
                current:'/home'
            })
        }else{
            this.setState({
                current:urlList[urlList.length-1]
            })
        }

    }

    public render() {
        const {classes} = this.props;

        return (
            <div className={classes.menu}>
                <Avatar src={logo} size={80}/>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[this.state.current]}
                    defaultOpenKeys={[this.state.openKey]}
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home">
                        <Link to={"/home"}>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/banner">
                        <Link to={"/bannerManage"}>
                            <Icon type="desktop"/>
                            <span>banner管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="appointment" title={
                        <span>
                        <Icon type="tag"/>
                        <span>预约挂号管理</span>
                        </span>
                    }>
                        <Menu.Item key="/appointment/number">
                            <Link to={"/appointment/number"}>
                                <span>号源管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="medicalLib" title={
                        <span>
                        <Icon type="book"/>
                        <span>医疗资源字典</span>
                        </span>
                    }>
                        <Menu.Item key="/medicalLib/hospitalLib">
                            <Link to={"/medicalLib/hospitalLib"}>
                                <span>医院字典</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/medicalLib/doctorLib">
                            <Link to={"/medicalLib/doctorLib"}>
                                <span>医生字典</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/infoPush">
                        <Link to={"/infoPush"}>
                            <Icon type="message"/>
                            <span>信息推送</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="user" title={
                        <span>
                        <Icon type="user"/>
                        <span>用户管理</span>
                        </span>
                    }>
                        <Menu.Item key="/user/verify">
                            <Link to={"/user/verify"}>
                                <span>实名认证</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/user/blacklist">
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

export default withRouter(withStyles(styles)(SideMenu));