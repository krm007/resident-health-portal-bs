import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Avatar,Badge, Button, Dropdown, Icon, Layout, Menu} from 'antd';
import * as React from "react";
import {Route, RouteProps, Switch} from "react-router";
import headIcon from "../../images/head.png"
import Home from "../home/Home";
import SideMenu from "./SideMenu";
import BreadCrumb from "./BreadCrumb";
import { BannerManage, InfoPush, NosourceManagement } from "../../router/RouterComponent";
import HospitalDictionary from "../MedicalResource/HospitalDictionary";
import DoctorsDictionary from "../MedicalResource/DoctorsDictionary";
import {WithStyles} from '@material-ui/core/styles/withStyles';
import {Avatar, Badge, Button, Dropdown, Icon, Layout, Menu} from 'antd';
import * as React from 'react';
import {Route, RouteProps, Switch} from 'react-router';
import headIcon from '../../images/head.png';
import BannerManage from '../bannerManage/BannerManage';
import Home from '../home/Home';
import InfoPush from '../infoPush/InfoPushNew';
import SideMenu from './SideMenu';
import BreadCrumb from './BreadCrumb';
import service from '../../axios/Service';
// @ts-ignore
import Qs from 'qs'

const {Header, Sider, Content} = Layout;
const styles = (theme: Theme) =>
    createStyles<'Layout' | 'header' | 'content' | 'userbox'>({
        Layout: {},
        content: {
            background: '#fff',
            margin: 14,
            minHeight: 480,
            padding: 14,
            overflowY: 'auto',
            height: '82vh',
        },
        header: {
            '& .trigger': {
                color: '#fff',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: '45px',
                padding: '0 24px',
                transition: 'color .3s',
                verticalAlign: '0.35em',
            },
            '& .ant-badge': {
                marginRight: '20px',
            },
            background: '#458AB6',
            height: '45px',
            padding: 0,
        },
        userbox: {
            width: '20vw',
            float: 'right',
            lineHeight: '40px',
            textAlign: 'right',
            paddingRight: '20px',
        },
    });

interface Iprops extends WithStyles<typeof styles> {
}

interface Istate {
    collapsed: boolean;
    logined: boolean;
    userId: number;
}

class MainLayout extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            collapsed: false,
            logined: true,
            userId: 0
        }
    }

    public componentWillMount() {
        // 请求登陆状态

    }

    public toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    public render() {
        const {classes} = this.props;
        // 用户头像下拉选项
        const menu = (
            <Menu>
                <Menu.Item>
                    <p
                        onClick={event1 => {
                            service.post(
                                '/loginByPhonePwd',
                                Qs.stringify({
                                    phone: '13348916944',
                                    password: '1234',
                                }),
                            );
                        }}
                    >
                        登陆
                    </p>
                </Menu.Item>
            </Menu>
        );
        const hasLogined = (
            <div>
                <span style={{lineHeight:"45px"}}>
                    <Badge >
                        <Icon type="wechat" style={{fontSize: "20px",color:"#f0f0f0"}}/>
                    </Badge>
                    <Badge count={1} >
                        <Icon type="mail" style={{fontSize: "20px",color:"#f0f0f0"}}/>
                    </Badge>
                </span>
                <Dropdown overlay={menu}>
                    <Avatar src={headIcon}/>
                </Dropdown>
            </div>

        );
        const noLogined = (
            <Button htmlType={"button"} type="primary">登陆</Button>
        );
        // 判断用户是否登陆
        const userLogState = this.state.logined ? hasLogined : noLogined;
        return (
            <div className={classes.Layout}>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible={true}
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo"/>
                        <SideMenu/>
                    </Sider>
                    <Layout>
                        <Header className={classes.header}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div className={classes.userbox}>
                                {userLogState}
                            </div>
                        </Header>
                        <Content>
                            <BreadCrumb/>
                            <div className={classes.content}>
                                <Switch>
                                    <Route<RouteProps> exact={true} path={"/home"} component={Home}/>
                                    <Route<RouteProps> path={"/bannerManage"} component={BannerManage}/>
                                    <Route<RouteProps> path={"/medicalLib/hospitalLib"} component={HospitalDictionary}/>
                                    <Route<RouteProps> path={"/medicalLib/doctorLib"} component={DoctorsDictionary}/>
                                    <Route<RouteProps> path={"/infoPush"} component={InfoPush}/>
                                    <Route<RouteProps> path={"/appointment/number"} component={NosourceManagement} />
                                </Switch>
                            </div>

                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default withStyles(styles)(MainLayout);