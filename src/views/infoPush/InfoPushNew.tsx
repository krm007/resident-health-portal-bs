import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Form, Input, Select, Col, Row, Button,message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {RouteComponentProps} from "react-router";
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {OneList} from "../../type/MessageData";
import {
    addNew,
    // addNew,
    getInfoOneList
} from "../../axios/Request";

const FormItem = Form.Item;
const Option = Select.Option;
declare global {
    interface Window {
        editor: any;
    }
}
const styles = (theme: Theme) => createStyles<"InfoPushNew">({
    InfoPushNew: {
        "& .ck-editor__editable": {
            minHeight: "30vh"
        }
    }
});

interface Iprops extends WithStyles<typeof styles>, FormComponentProps, RouteComponentProps<any> {
    text: string,
}

interface Istates {
    oneList: OneList
}

class InfoPushNew extends React.Component<Iprops, Istates> {

    constructor(props: Iprops) {
        super(props);
        this.state = {
            oneList: {}
        }
    }

    public componentWillMount = () => {
        const id = this.props.match.params.id;
        if (id) {// 有传值id
            getInfoOneList(id).then(value => {
                this.setState({
                    oneList: value.data
                })
            })
        }
    };
    // 获取富文本编辑器内容
    public getData() {
        return window.editor
    }

    // 点击发送
    public handleSend = () => {
        console.log(this.state.oneList)
    };
    // 点击保存
    public handleSave = (val: any) => {
        const key = "content";
        val[key] = this.getData();
        addNew(val).then((value)=>{
            console.log(value);
            message.success("保存成功~但似乎有点儿不对劲")
        })
    };

    public render() {
        const {classes} = this.props;
        const {getFieldDecorator} = this.props.form;
        const footBar = (this.props.match.params.id) ? <div>you</div> : "";
        const formItemLayout = {
            labelCol: {
                xs: {span: 1},
                sm: {span: 1},
            },
            wrapperCol: {
                xs: {span: 20},
                sm: {span: 20},
            },
        };
        return (
            <div className={classes.InfoPushNew}>
                <div>
                    <Row>
                        <Col span={24}>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.props.form.validateFields((err, values) => {
                                        if (!err) {
                                            this.handleSave(values)
                                        }
                                    });
                                }}
                            >
                                <FormItem {...formItemLayout} label="标题" style={{marginBottom: 0}}>
                                    {getFieldDecorator('title', {
                                        initialValue: this.state.oneList.title,
                                        rules: [{message: '请填写标题！', required: true}],
                                    })(
                                        <Input style={{width: "300px", marginRight: "10px"}}/>
                                    )}
                                    <span>标题长度25汉字之内，超出显示省略号</span>
                                </FormItem>
                                <FormItem {...formItemLayout} label="类型">
                                    {getFieldDecorator('secondType', {
                                        initialValue: this.state.oneList.secondType,
                                        rules: [{required: true}],
                                    })(
                                        <Select
                                            style={{width: 300}}
                                            optionFilterProp="children"
                                            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="大众保健">大众保健</Option>
                                            < Option value="慢病护理">慢病护理</Option>
                                            < Option value="老年人保健">老年人保健</Option>
                                            < Option value="孕产妇保健">孕产妇保健</Option>
                                            < Option value="婴幼儿护理">婴幼儿护理</Option>
                                            < Option value="政府政策">政府政策</Option>
                                            < Option value="规章制度">规章制度</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // 获取数据
                                    data={this.state.oneList.content}
                                    config={{
                                        language: 'zh-cn',
                                        toolbar: ['undo', 'redo', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'imageUpload', 'blockQuote'],
                                        ckfinder: {
                                            uploadUrl: '/manage/editorUpload?status=1'
                                        }
                                    }}
                                    onInit={(editor: any) => {
                                        // You can store the "editor" and use when it is needed.

                                    }}
                                    onChange={(event: any, editor: any) => {
                                        window.editor = editor.getData();
                                        const list = this.state.oneList;
                                        list.content = window.editor;
                                        this.setState({
                                            oneList:list
                                        })
                                    }}
                                />

                                {footBar}
                                <FormItem {...formItemLayout} >

                                    <Button htmlType="submit" type="primary" style={{marginRight: "20px"}}>保存</Button>
                                    <Button type="primary" onClick={this.handleSend}>发送</Button>

                                </FormItem>
                            </Form>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default Form.create()(withStyles(styles)(InfoPushNew));