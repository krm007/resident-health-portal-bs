import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Form, List, Input, Button,} from 'antd';
import {RouteComponentProps, withRouter} from "react-router";
// import {Link} from "react-router-dom";


const styles = (theme: Theme) => createStyles<"Filter" | "search">({
    Filter: {
        "& .ant-form-item-label": {
            lineHeight: "30px"
        },
        "& .ant-list-item": {
            display: "inline-block",
            border: 0,
            padding: "4px 0",
            marginRight: "20px"
        },
        "& a:hover": {
            color: "#65ace6"
        },
        "& a": {
            color: "#4e4e4e"
        },
        "& a.active": {
            color: "#65ace6 !important"
        }
    },
    search: {
        paddingTop: "5px",
        paddingBottom: "6px"
    },

});

interface Iprops extends WithStyles<typeof styles>,RouteComponentProps {
    handleScreen: any
}

interface Istate {
    selectedData: string[],
    currentIndex1: any,
    currentIndex2: any,
}

const filterList = {
    "arr1": ["大众保健", "慢病管理", "老年人保健", "孕产妇保健", "婴幼儿护理"],
    "arr2": ["通知公告", "政府计划", "规章制度"]
};

class Filter extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            selectedData: [],
            currentIndex1: "",
            currentIndex2: "",
        };
    }

    public componentWillMount() {

    }

    public active1 = (e: any, index: any, key: string) => {
        // 获取元素 e.target
        // 获取文本 e.target.text
        const key1 = [key];
        this.setState({
            currentIndex1: index,
            selectedData: this.state.selectedData.concat(key1)
        });

    };
    public active2 = (e: any, index: any, key: any) => {
        // 获取元素 e.target
        // 获取文本 e.target.text
        const key2 = [key];
        this.setState({
            currentIndex2: index,
            selectedData: this.state.selectedData.concat(key2)
        })
    };
    public handleSearch = (val: string) => {
        const searchKey = [val];
        this.setState({
            selectedData: this.state.selectedData.concat(searchKey)
        });
    };
    public addNew = () => {
        this.props.history.push(`/infoPushNew/`)
    };

    public render() {
        const {classes} = this.props;
        const {currentIndex1} = this.state;
        const {currentIndex2} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 2},
                sm: {span: 2},
            },
            wrapperCol: {
                xs: {span: 20},
                sm: {span: 20},
            },
        };
        const FormItem = Form.Item;
        const Search = Input.Search;
        return (
            <div className={classes.Filter}>
                <Form>
                    <FormItem {...formItemLayout} label="健康资讯" style={{marginBottom: 0}}>
                        <List size="small"
                              dataSource={filterList.arr1}
                              renderItem={(item: any, index: any) => (
                                  <List.Item column={4}>
                                      <a onClick={(e) => this.active1(e, index, item)}
                                         className={currentIndex1 === index ? "active" : ""}>{item}</a>
                                  </List.Item>
                              )}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="信息公开" style={{marginBottom: 0}}>
                        <List size="small"
                              dataSource={filterList.arr2}
                              renderItem={(item: any, index: any) => (
                                  <List.Item column={4}>
                                      <a onClick={(e) => this.active2(e, index, item)}
                                         className={currentIndex2 === index ? "active" : ""}>{item}</a>
                                  </List.Item>
                              )}
                        />
                    </FormItem>
                    <div className={classes.search}>
                        <Search
                            style={{width: 225, marginLeft: "14px", marginRight: "24px"}}
                            placeholder="输入关键字"
                            onSearch={value => this.handleSearch(value)}
                            enterButton={true}
                        />
                        <Button type="primary" style={{verticalAlign: "top"}} onClick={this.addNew}>
                            新建推送
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Filter));