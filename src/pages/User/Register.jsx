import React from 'react';
import { List, InputItem, Toast, Button, Flex, WhiteSpace } from 'antd-mobile';
import styles from './login.less';
import code from '../../assets/login/code.svg';
import password from '../../assets/login/password.svg';
import phone from '../../assets/login/phone.svg';
import { createForm } from 'rc-form';
import { Link } from 'umi';
import * as ReactDOM from 'react-dom';

@createForm()
export default class Register extends React.Component {
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
              maxLength={11}
              labelNumber={2} // 标签文字个数
              placeholder="手机号码"
            >
              <img alt="手机号码" src={phone} />
            </InputItem>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              clear={true}
              labelNumber={2} // 标签文字个数
              placeholder="登录密码"
            >
              <img alt="登录密码" src={password} />
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
              labelNumber={2} // 标签文字个数
              placeholder="验证码"
            >
              <img alt="验证码" src={code} />
            </InputItem>
          </List>
          <WhiteSpace size="lg" />
          <Flex style={{ textDecoration: 'underline' }}>
            <Flex.Item style={{ textAlign: 'right', paddingRight: '20px' }}>
              <Link to={'/user/login'}>已有账号，去登录</Link>
            </Flex.Item>
          </Flex>
          <Button type="primary" className={styles['btn-enter']} onClick={this.handleSubmit}>
            注册
          </Button>
        </div>
      </div>
    );
  }
}
