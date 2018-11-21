import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {  Icon, Layout } from 'antd';
import * as React from "react";
import { Route, RouteProps, Switch } from "react-router";
import BannerManage from "../bannerManage/BannerManage";
import Home from "../home/Home";
import InfoPush from "../infoPush/InfoPush";
import SideMenu from "./SideMenu";

const { Header, Sider, Content } = Layout;
const styles = (theme: Theme) => createStyles<"Layout">({
    Layout: {}
});

interface Iprops extends WithStyles<typeof styles> {
}
interface Istate {
    collapsed:boolean
}
class MainLayout extends React.Component<Iprops,Istate> {
    constructor(props:Iprops){
        super(props);
        this.state={
            collapsed:false
        }
    }
    public toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.Layout}>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible={true}
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <SideMenu />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Switch>
                                <Route<RouteProps> exact={true} path={"/"} component={Home}/>
                                <Route<RouteProps> path={"/bannerManage"} component={BannerManage}/>
                                <Route<RouteProps> path={"/infoPush"} component={InfoPush}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default withStyles(styles)(MainLayout);