import React from 'react';
import { List, InputItem, Toast, Button, Flex, WhiteSpace } from 'antd-mobile';
import styles from './login.less';
import router from 'umi/router';
import logo from '../../assets/login/login.png';
import password from '../../assets/login/password.svg';
import phone from '../../assets/login/phone.svg';
import { createForm } from 'rc-form';
import { Link } from 'umi';

@createForm()
export default class Login extends React.Component {
  state = {
    hasError: false,
    phone: '',
    password: '',
  };

  handleSubmit = () => {
    Toast.success('登录成功');
    router.push('/tcmh/my');
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.home}>
        <div className={styles.index}>
          <img alt="logo" className={styles.logo} src={logo} />
          <div className={styles.title}>
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
            </List>
          </div>
          <WhiteSpace size="lg" />
          <Flex style={{ textDecoration: 'underline' }}>
            <Flex.Item style={{ paddingLeft: '20px' }}>
              <Link to={'/user/forget'}>忘记密码</Link>
            </Flex.Item>
            <Flex.Item style={{ textAlign: 'right', paddingRight: '20px' }}>
              <Link to={'/user/register'}>注册新账号</Link>
            </Flex.Item>
          </Flex>
          <Button type="primary" className={styles['btn-enter']} onClick={this.handleSubmit}>
            登录
          </Button>
        </div>
      </div>
    );
  }
}
