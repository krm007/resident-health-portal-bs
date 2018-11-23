import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;

const styles = (theme: Theme) => createStyles<"Login">({
    Login: {}
});

interface Iprops extends WithStyles<typeof styles> ,FormComponentProps {
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
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    public render() {
        const {classes} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={classes.Login}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(withStyles(styles)(Login));