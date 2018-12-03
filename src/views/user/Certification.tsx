import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Col, Form,Input,Row} from 'antd'
import Button from "antd/lib/button/button";
import {FormComponentProps} from "antd/lib/form";
import * as React from "react";
import Back from '../../images/userCenter/idCardBack.png';
import Face from '../../images/userCenter/idCardFace.png';
import ImgAvatar from './ImgAvatar';

const FormItem = Form.Item;
const styles = (theme: Theme) => createStyles<"root" | "hiddenInput">({
    root: {},
    hiddenInput: {
        visibility: "hidden"
    }
});

interface Iprops extends WithStyles<typeof styles>, FormComponentProps  {

}

interface Istates {
    upLoadVisible: boolean,
    upLoadEle: any,
    fileList:[]
}

class Certification extends React.Component<Iprops, Istates> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            upLoadVisible: false,
            upLoadEle: "",
            fileList:[]
        }
    }

    public componentWillMount() {

    }
    // 点击图片触发upload

    // 提交
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

            }
        });

    };
// 文件列表的删除

    public render() {
        const { getFieldDecorator } = this.props.form;
        const {classes} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div className={classes.root}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="真实姓名">
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: '请填写姓名',
                            }],
                        })(
                            <Input placeholder="" id="userName" style={{width:"255px"}}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="身份证号">
                        {getFieldDecorator('idNum', {
                            rules: [{
                                required: true,
                                message: '请填写身份证',
                            }],
                        })(
                            <Input placeholder="" id="idNum" style={{width:"255px"}}/>
                        )}

                    </FormItem>
                    <FormItem {...formItemLayout} label="上传身份证照片">
                        <Row gutter={30}>
                            <Col span={12}>
                                <ImgAvatar upLoadType="身份证正面" imgBg={Face}/>
                            </Col>
                            <Col span={12}>
                                <ImgAvatar upLoadType="身份证背面" imgBg={Back}/>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(withStyles(styles)(Certification));