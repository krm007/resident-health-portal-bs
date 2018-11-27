import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Form,List,Input,Button} from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const styles = (theme: Theme) => createStyles<"Filter"|"search">({
    Filter: {
        "& .ant-form-item-label":{
            lineHeight:"30px"
        },
        "& .ant-list-item":{
            display:"inline-block",
            border:0,
            padding:"4px 0",
            marginRight:"20px"
        }
    },
    search:{
        paddingTop:"5px",
        paddingBottom:"6px"
    }
});

interface Iprops extends WithStyles<typeof styles> {
}

const filterList = {
    "arr1": ["大众保健", "慢病管理", "老年人保健", "孕产妇保健", "婴幼儿护理"],
    "arr2": ["通知公告", "政府计划", "规章制度"]
};

class Filter extends React.Component<Iprops> {
    constructor(props: Iprops) {
        super(props);

    }

    public render() {
        const {classes} = this.props;

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
        return (
            <div className={classes.Filter}>
                <Form>
                    <FormItem {...formItemLayout} label="健康资讯" style={{marginBottom: 0}}>
                        <List size="small"
                              dataSource={filterList.arr1}
                              renderItem={(item: any) => (
                                  <List.Item column={4} >
                                    <span >{item}</span>
                                  </List.Item>
                              )}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="信息公开" style={{marginBottom: 0}}>
                        <List size="small"
                              dataSource={filterList.arr2}
                              renderItem={(item: any) => (
                                  <List.Item column={4} >
                                      <span>{item}</span>
                                  </List.Item>
                              )}
                        />
                    </FormItem>
                    <div className={classes.search}>
                        <Search
                            style={{ width: 225,marginLeft:"14px",marginRight:"24px" }}
                            placeholder="输入关键字"
                            onSearch={value => console.log(value)}
                            enterButton={true}
                        />
                        <Button  type="primary"  style={{verticalAlign:"top"}}>新建推送</Button>
                    </div>

                </Form>
            </div>
        );
    }
}

export default withStyles(styles)(Filter);