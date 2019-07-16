import React from 'react';
import { WhiteSpace, Flex, Tabs, Grid } from 'antd-mobile';
import ListViewNotFresh from './ListViewNotFresh';
import { queryUserList } from '@/services/api';
import router from 'umi/router';

const tabs = [{ title: '中医' }, { title: '西医' }, { title: '骨科' }, { title: '职业' }];

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>
    Block
  </div>
);
let index = 0;
export default class Assessment extends React.Component {
  state = {
    imgHeight: 176,
    ids: ['', '', '', ''],
    tabIndex: 0,
  };

  setFocus = (id, i) => {
    this.setIds(id, i || this.state.tabIndex);
    console.log(this.ref);
    this.ref.focus();
    // router.push('/');
  };

  setRow = (rowData, sectionID, rowID) => {
    if (rowID === 0 || rowID === '0') {
      if (index >= tabs.length) {
        index = 0;
      }
      this.setIds(rowData.userName, index);
      index++;
    }
    return (
      <div
        key={rowID}
        style={{ padding: '0 5px' }}
        onClick={() => {
          this.setFocus(rowData.userName);
        }}
        ref={el => (this.ref = el)}
      >
        {rowData.userName}
      </div>
    );
  };

  /**
   * 更新选中ID
   * @param id
   * @param index
   */
  setIds = (id, index) => {
    // const ids = this.state.ids;
    // ids[index] = id;
    // this.setState({ ids: ids });
    this.state.ids[index] = id;
  };

  setRow1 = (rowData, sectionID, rowID) => {
    const data = [
      {
        desc: '测试卡片',
      },
      {
        desc: '测试2测试2测试2测试2',
      },
      {
        desc: '测试3',
      },
    ];
    return (
      <div key={rowID}>
        <Grid
          data={data}
          columnNum={3}
          hasLine={false}
          square={false}
          // itemStyle 自定义单个宫格样式
          renderItem={dataItem => (
            <div style={{ padding: '1px' }}>
              <img
                src={
                  'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1563180126&di=3f443009cf37b35a7228da15d55b1556&src=http://www.chinadaily.com.cn/hqzx/images/attachement/jpg/site385/20120924/00221918200911ca40e52b.jpg'
                }
                style={{ width: '65px', height: '65px' }}
                alt=""
              />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span>{dataItem.desc}</span>
              </div>
            </div>
          )}
        />
      </div>
    );
  };

  setTableIndex = (table, index) => {
    this.setState({ tabIndex: index });
  };

  renderContent = (tab, index) => {
    return (
      <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <WhiteSpace size="sm" />
        <Flex justify="start">
          <div style={{ width: '30%', height: '100%' }}>
            <ListViewNotFresh
              listKey={1}
              parm={{ key: index }}
              row={() => this.setRow}
              listName="userList"
              queryListFetch={queryUserList}
              height={1}
            />
          </div>
          <div style={{ width: '80%', height: '100%' }}>
            <ListViewNotFresh
              listKey={0}
              parm={{ key: index, userName: this.state.ids[index] }}
              row={() => this.setRow1}
              listName="userList"
              queryListFetch={queryUserList}
              height={1}
            />
          </div>
        </Flex>
      </div>
    );
  };

  render() {
    return (
      <Tabs
        tabs={tabs}
        initialPage={0}
        animated={true}
        usePaged={true}
        onChange={this.setTableIndex}
      >
        {this.renderContent}
      </Tabs>
    );
  }
}
