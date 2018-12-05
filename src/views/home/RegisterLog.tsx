import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {List, Avatar} from 'antd';
import {LogList} from "../../type/HospitalData";
// import reqwest from 'reqwest';
// import InfiniteScroll from 'react-infinite-scroller';

const styles = (theme: Theme) => createStyles({
    root: {},

});

interface Iprops extends WithStyles<typeof styles> {
    data:LogList[]
}

class RegisterLog extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                    <List
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 5,
                        }}
                        dataSource={this.props.data}
                        renderItem={(item:LogList) => (
                            <List.Item key={item.id} style={{marginBottom:"5px"}}>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    description={item.username+"于"+item.date+"登录系统"}
                                />
                            </List.Item>
                        )}
                    />
            </div>);
    }
}

export default withStyles(styles)(RegisterLog);