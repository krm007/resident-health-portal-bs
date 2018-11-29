import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Form, Input, Select, Col, Row, Button} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {RouteComponentProps} from "react-router";
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ImageCompressor from "image-compressor.js";

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
    text: string
}


class InfoPushNew extends React.Component<Iprops> {

    constructor(props: Iprops) {
        super(props);

    }

    public componentDidMount = () => {

    };
    public getData() {
        return window.editor
    }
    // 点击发送
    public handleSend = () => {

    };
    // 点击保存
    public handleSave=(value:any)=>{
        console.log(value+","+this.getData())
    };
    public render() {
        const {classes} = this.props;
        const {getFieldDecorator} = this.props.form;
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
                                            console.log(values);
                                        }
                                    });
                                }}
                            >
                                <FormItem {...formItemLayout} label="标题" style={{marginBottom: 0}}>
                                    {getFieldDecorator('title', {
                                        rules: [{message:'请填写标题！',required:true}],
                                    })(
                                        <div>
                                            <Input style={{width: "300px", marginRight: "10px"}}/>
                                            <span>标题长度25汉字之内，超出显示省略号</span>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="类型">
                                    {getFieldDecorator('type', {
                                        initialValue: "1",
                                        rules: [{required:true}],
                                    })(
                                        <Select
                                            style={{width: 300}}
                                            optionFilterProp="children"
                                            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="1">大众保健</Option>
                                            < Option value="2">慢病护理</Option>
                                            < Option value="3">老年人保健</Option>
                                            < Option value="4">孕产妇保健</Option>
                                            < Option value="5">婴幼儿护理</Option>
                                            < Option value="6">政府政策</Option>
                                            < Option value="7">规章制度</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // 获取数据
                                    data=""
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
                                    }}
                                />
                                <FormItem {...formItemLayout} >

                                    <Button htmlType="submit" type="primary" style={{marginRight:"20px"}}>保存</Button>
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