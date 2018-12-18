import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Form, Icon, Input, Button} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {RouteComponentProps, withRouter} from "react-router";
import {getUrl} from "../../_util/pathTool";
import {login} from "../../_util/auth"
import {logIn} from "../../axios/UserRequest";

const FormItem = Form.Item;

const styles = (theme: Theme) => createStyles<"Login" | "loginForm">({
    Login: {
        position:"relative"
    },
    loginForm:{
        width:"400px",
        height:"300px",
        marginLeft:"-200px",
        marginTop:"-150px",
        top:"40%",
        left:"50%",
        position:"absolute",
        borderRadius:"5px",
        boxShadow:"0 0 5px rgba(0,0,0,.4)",
        padding:"15px 40px"
    }
});

interface Iprops extends WithStyles<typeof styles> ,FormComponentProps ,RouteComponentProps{
}

class Login extends React.Component<Iprops> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            login: false
        }
    }
    // 表单提交
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // 登陆请求
            logIn(this.props.form.getFieldsValue()).then(
                value => {
                    this.props.history.push(getUrl());
                    // 将用户信息存入localstorage
                    login(value.data.phone,value.data)
                }
            )
        });
    };
    public render() {
        const {classes} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div  className={classes.loginForm}>
                <p style={{"textAlign":"center"}}>用户登陆</p>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '手机号码!' }],
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{"width":"100%"}}>
                            登陆
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default withRouter(Form.create()(withStyles(styles)(Login)));