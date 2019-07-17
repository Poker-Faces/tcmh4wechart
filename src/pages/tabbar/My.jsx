import React from 'react';
import { List, Modal } from 'antd-mobile';
import styles from './my.less';
import router from 'umi/router';

const Item = List.Item;
const alert = Modal.alert;
export default class My extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.index}>
          {/*<Grid data={data} hasLine={false} columnNum={1} square={false} className={styles.title}/>*/}
          <div
            className={styles.title}
            onClick={() => {
              router.push('/my/info');
            }}
          >
            <img
              src={'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png'}
              style={{ borderRadius: '50%', height: '140px', marginTop: '20px' }}
              alt={'头像'}
            />
            <div style={{ marginTop: '10px' }}>
              <span style={{ color: 'white', fontSize: '18px' }}>龚德圣</span>
            </div>
          </div>
          <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={() => {
                alert('开发中...');
              }}
            >
              我的数据
            </Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() => {
                alert('开发中...');
              }}
              arrow="horizontal"
            >
              我的功法
            </Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() => {
                router.push('/user/forget');
              }}
              arrow="horizontal"
            >
              重置密码
            </Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() => {
                router.push('/my/feedback');
              }}
              arrow="horizontal"
            >
              意见反馈
            </Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() =>
                alert(' ', '确认退出登录吗？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确认', onPress: () => router.push('/user/login') },
                ])
              }
              arrow="horizontal"
            >
              退出登录
            </Item>
          </List>
        </div>
      </div>
    );
  }
}
