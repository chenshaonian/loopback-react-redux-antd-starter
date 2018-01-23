import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import { register } from '../ducks/login';

import '../css/RegisterForm.css';

function mapDispatchToProps(dispatch) {
  return {
    register: (credentials) => dispatch(register(credentials))
  };
}

class NormalRegisterForm extends Component {
  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        self.props.register(values);
      }
    });
  }
  checkPassword = (rule, value, cb) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      cb('Two passwords that you enter is inconsistent!');
    } else {
      cb();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (        
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordConfirm', {
            rules: [{ required: true, message: 'Please reinput your Password!' }, { validator: this.checkPassword}],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password confirm" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Form.create()(NormalRegisterForm));
