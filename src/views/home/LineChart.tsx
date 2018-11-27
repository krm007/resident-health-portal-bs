import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import ChartMonth from "./ChartMonth";
import ChartDay from "./ChartDay";
import { Tabs } from 'antd';


const TabPane = Tabs.TabPane;

function callback(key:any) {
    console.log(key);
}

const styles = (theme: Theme) => createStyles<"root">({
    root: {}
});

interface Iprops extends WithStyles<typeof styles> {
}

class LineChart extends React.Component<Iprops> {

    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}><br/>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="按月统计" key="1">
                        <ChartMonth />
                    </TabPane>
                    <TabPane tab="按天统计" key="2">
                        <ChartDay />
                    </TabPane>
                </Tabs>,

            </div>);
    }
}

export default withStyles(styles)(LineChart);