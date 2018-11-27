import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Form, Input, Select, Col, Row} from "antd";
import {FormComponentProps} from "antd/lib/form";
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
            minHeight: "50vh"
        }
    }
});

interface Iprops extends WithStyles<typeof styles>, FormComponentProps {
    text: string
}


class InfoPushNew extends React.Component<Iprops> {

    constructor(props: Iprops) {
        super(props);

    }

    public componentDidMount =()=> {

    };

    public getData = () => {
        return window.editor.getDate()
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
                            <Form>
                                <FormItem {...formItemLayout} label="标题" style={{marginBottom: 0}}>
                                    {getFieldDecorator('title', {
                                        rules: [{message: 'Username is required!'}],
                                    })(
                                        <div>
                                            <Input style={{width: "300px", marginRight: "10px"}}/>
                                            <span>标题长度25汉字之内，超出显示省略号</span>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="类型">
                                    {getFieldDecorator('type', {
                                        rules: [{message: 'Username is required!'}],
                                    })(
                                        <Select
                                            style={{width: 300}}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="tom">Tom</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // 获取数据
                                    data="空着"
                                    config={{
                                        language: 'zh-cn',
                                        toolbar:[ 'undo', 'redo','bold', 'italic', 'link', 'bulletedList', 'numberedList','imageUpload', 'blockQuote'],
                                        ckfinder:{
                                            uploadUrl: '/manage/editorUpload?status=1'
                                        }
                                    }}
                                    onInit={(editor: any) => {
                                        // You can store the "editor" and use when it is needed.

                                    }}
                                    onChange={(event: any, editor: any) => {
                                        const data = editor.getData();
                                        console.log({event, editor, data});
                                    }}
                                />
                            </Form>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default Form.create()(withStyles(styles)(InfoPushNew));