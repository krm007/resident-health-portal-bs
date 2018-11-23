import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Breadcrumb} from 'antd';
import * as React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {breadcrumbNameMap} from '../../router/BreadCrumbLinks';

const styles = (theme: Theme) => createStyles<"root">({
    root: {
        background: '#fff',
        height: 40,
        padding: 10,

    }
});

interface Iprops extends RouteComponentProps<any> ,WithStyles<typeof styles> {
}
interface Istate  {
    AppPathSnippets: any[];
    breadcrumbItems: any;
    location: any;
}
class BreadCrumb extends React.Component<Iprops,Istate> {
    public componentWillMount() {
        this.getPath();
    }

    public componentWillReceiveProps() {
        this.getPath();
    }
    public getPath = () => {
        //
        const pathSnippets = this.props.history.location.pathname
            .split('/')
            .filter(i => i);
        this.setState({
            AppPathSnippets: pathSnippets
        });
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        this.setState({
            breadcrumbItems: [(
                <Breadcrumb.Item key="home">
                    当前位置：
                    <Link to="/">主页</Link>
                </Breadcrumb.Item>
            )].concat(extraBreadcrumbItems)
        });
        // alert(breadcrumbItems)
    };
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Breadcrumb>{this.state.breadcrumbItems}</Breadcrumb>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(BreadCrumb));