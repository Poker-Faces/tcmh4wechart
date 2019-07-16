import React from 'react';
import { List, InputItem, Toast, Button, Flex, WhiteSpace } from 'antd-mobile';
import styles from './login.less';
// import code from '../../assets/login/code.svg';
// import password from '../../assets/login/password.svg';
// import phone from '../../assets/login/phone.svg';
import { createForm } from 'rc-form';
import * as ReactDOM from 'react-dom';

@createForm()
export default class ForgetPassword extends React.Component {
  handleSubmit = () => {
    const {} = this.props.from;
  };
  setCodeTimer = () => {
    const el = ReactDOM.findDOMNode(this.codeBu);
    if (el.innerHTML === '获取验证码') {
      let time = 60;
      el.innerHTML = time + '秒';
      let timer = setInterval(function() {
        time--;
        el.innerHTML = time + '秒';
        if (time === 0) {
          clearInterval(timer);
          el.innerHTML = '获取验证码';
        }
      }, 1000);
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.home}>
        <div className={styles.index}>
          <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
            <InputItem
              {...getFieldProps('phone')}
              type="phone"
              clear={true}
              editable={!this.props.phone}
              maxLength={11}
              placeholder="手机号码"
            >
              手机号：
            </InputItem>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              clear={true}
              placeholder="请输入新密码"
            >
              新密码：
            </InputItem>

            <InputItem
              {...getFieldProps('password')}
              type="password"
              clear={true}
              placeholder="请再次确认新密码"
            >
              确认密码：
            </InputItem>

            <InputItem
              {...getFieldProps('code')}
              type="code"
              extra={
                <span ref={el => (this.codeBu = el)} style={{ color: '#1890ff' }}>
                  获取验证码
                </span>
              }
              onExtraClick={this.setCodeTimer}
              clear={true}
              placeholder="验证码"
            >
              验证码：
            </InputItem>
          </List>
          <Button type="primary" className={styles['btn-enter']} onClick={this.handleSubmit}>
            提交
          </Button>
        </div>
      </div>
    );
  }
}
