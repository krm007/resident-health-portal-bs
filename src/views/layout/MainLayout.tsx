import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Layout} from "antd";
import * as React from "react";
import {Redirect, Route, RouteProps, Switch} from "react-router";
import Home from "../home/Home";
import SideMenu from "./SideMenu";
import BreadCrumb from "./BreadCrumb";
import MyHeader from "./MyHeader";
import {
    BannerManage,
    Blacklist,
    InfoPush,
    NosourceManagement,
    InfoPushNew,
    DoctorsDictionary,
    DocDetails,
    Certification,
    Verify,
    HospitalDictionary,
    HosDetails
} from "../../router/RouterComponent";



const {Sider, Content} = Layout;
const styles = (theme: Theme) =>
    createStyles<"Layout" | "content" >({
        Layout: {},
        content: {
            background: "#fff",
            margin: 14,
            minHeight: 480,
            padding: 14,
            overflowY: "auto",
            height: "82vh"
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
            logined: false,
            userId: 0
        };
    }

    public componentWillMount() {
        // 请求登陆状态

    }

    public toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
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
                        theme={"dark"}
                    >
                        <div className="logo"/>
                        <SideMenu/>
                    </Sider>
                    <Layout>
                        <MyHeader
                            collapsed={this.state.collapsed}
                            toggle={()=>{
                                this.setState({
                                    collapsed:!this.state.collapsed
                                })
                            }}
                        />
                        <Content>
                            <BreadCrumb/>
                            <div className={classes.content}>
                                <Switch>
                                    <Redirect to={"/home"} path={"/"} exact={true}/>
                                    <Route<RouteProps>
                                        exact={true}
                                        path={"/home"}
                                        component={Home}
                                    />
                                    <Route<RouteProps>
                                        path={"/bannerManage"}
                                        component={BannerManage}
                                    />
                                    <Route<RouteProps>
                                        path={"/medicalLib/hospitalLib"}
                                        component={HospitalDictionary}
                                    />
                                    <Route<RouteProps>
                                        path={"/medicalLib/doctorLib"}
                                        component={DoctorsDictionary}
                                    />
                                    <Route<RouteProps>
                                        path={"/addHos"}
                                        component={HosDetails}
                                    />
                                    <Route<RouteProps>
                                        path={"/hosDetails/:id"}
                                        component={HosDetails}
                                    />
                                    <Route<RouteProps>
                                        path={"/addDoc"}
                                        component={DocDetails}
                                    />
                                    <Route<RouteProps>
                                        path={"/docDetails/:id"}
                                        component={DocDetails}
                                    />
                                    <Route<RouteProps>
                                        path={"/infoPush"}
                                        component={InfoPush}
                                    />
                                    <Route<RouteProps>
                                        path={"/infoPushNew"}
                                        component={InfoPushNew}
                                    />
                                    <Route<RouteProps>
                                        path={"/infoPushEditor/:id?"}
                                        component={InfoPushNew}
                                    />
                                    <Route<RouteProps>
                                        path={"/appointment/number"}
                                        component={NosourceManagement}
                                    />
                                    <Route<RouteProps> path={"/user/verify"} component={Verify}/>
                                    <Route<RouteProps>
                                        path={"/user/Certification"}
                                        component={Certification}
                                    />
                                    <Route<RouteProps>
                                        path={"/user/blacklist"}
                                        component={Blacklist}
                                    />
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
