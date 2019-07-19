import React from 'react';
import { WhiteSpace, Flex, Grid, SegmentedControl, ListView } from 'antd-mobile';
import { queryUserList } from '@/services/api';

export default class Assessment extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2, // 渲染规则
    });
    this.state = {
      dataSource,
      initialListSize: 1000,
      isLoading: true,
      height: document.documentElement.clientHeight * 0.86,
      useBodyScroll: false,
      imgHeight: 176,
      id: '',
      type: '中医',
      data: [],
      first: true, // 默认选中的数据
    };
  }

  componentDidMount() {
    this.queryDataList({ type: this.state.type });
  }

  /**
   * 加载左边列表数据
   * @param payload
   * @returns {*}
   */
  queryDataList = (payload = { pageRow: 1000 }) => {
    payload.token = '3Pbeb3ezJDoam5f8qGB';
    return queryUserList(payload).then(data => {
      if (data) {
        const { totalRow, gridModel } = data.data.userList;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(gridModel),
          initialListSize: totalRow,
        });
      }
    });
  };

  /**
   * 加载右边列表数据
   * @param payload
   * @returns {*}
   */
  queryListFetch = (payload = { pageRow: 1000 }) => {
    payload.token = '3Pbeb3ezJDoam5f8qGB';
    return queryUserList(payload).then(data => {
      if (data) {
        const { gridModel } = data.data.userList;
        this.setState({
          data: gridModel,
          first: false,
          id: payload.userName,
        });
      }
    });
  };

  /**
   * 渲染每行元素
   * @param rowData
   * @param sectionID
   * @param rowID
   * @returns {*}
   */
  setRow = (rowData, sectionID, rowID) => {
    if (rowData.userStatus === '1' && rowID === '0' && this.state.first) {
      this.queryListFetch({ userName: rowData.userName });
    }
    return (
      <div
        key={rowID}
        style={
          this.state.id === rowData.userName
            ? {
                // 默认选中的行
                padding: '0 5px',
                backgroundColor: 'white',
                lineHeight: '40px',
              }
            : { padding: '0 5px', backgroundColor: '#F5F5F9', lineHeight: '40px' }
        }
        onClick={() => {
          this.queryListFetch({ userName: rowData.userName });
        }}
      >
        {rowData.userName}
      </div>
    );
  };

  /**
   * 选中分段按钮
   * @param e
   */
  setData = e => {
    const { value, selectedSegmentIndex } = e.nativeEvent;
    this.queryDataList({ type: value });
    this.setState({
      selectedIndex: selectedSegmentIndex,
      type: value,
      first: true,
    });
  };

  render() {
    const { data, selectedIndex, height, dataSource, initialListSize } = this.state;
    // 行间距样式
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 4,
        }}
      />
    );
    return (
      <div>
        <div style={{ padding: '10px', backgroundColor: 'white' }}>
          <SegmentedControl
            values={['中医', '西医', '骨科', '职业']}
            selectedIndex={selectedIndex || 0}
            onChange={this.setData}
          />
        </div>
        <WhiteSpace size="sm" />
        <Flex justify="start" style={{ backgroundColor: 'white', alignItems: 'end' }}>
          <div style={{ width: '30%' }}>
            <ListView
              dataSource={dataSource}
              renderRow={this.setRow}
              renderSeparator={separator}
              useBodyScroll={true}
              style={{
                height: height,
                backgroundColor: '#F5F5F9',
                bottom: '0px',
              }}
              pageSize={10}
              initialListSize={initialListSize}
            />
          </div>
          <div
            style={{
              width: '80%',
              height: document.documentElement.clientHeight * 0.86,
              padding: '5px',
              borderRadius: '7%',
            }}
          >
            <div style={{ height: '100%', overflowX: 'scroll' }}>
              {data.length > 0 ? (
                <Grid
                  itemStyle={{ backgroundColor: '#F5F5F9' }}
                  data={data}
                  columnNum={3}
                  hasLine={false}
                  square={false}
                  renderItem={dataItem => (
                    <div style={{ padding: '1px' }}>
                      <img
                        src={
                          'http://www.chinadaily.com.cn/hqzx/images/attachement/jpg/site385/20120924/00221918200911ca40e52b.jpg'
                        }
                        style={{ width: '65px', height: '65px', borderRadius: '50%' }}
                        alt=""
                      />
                      <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                        <span
                          style={{
                            display: 'block',
                            overflow: 'hidden',
                            height: '20px',
                          }}
                        >
                          {dataItem.userName}
                        </span>
                      </div>
                    </div>
                  )}
                />
              ) : (
                <span>暂无数据</span>
              )}
            </div>
          </div>
        </Flex>
      </div>
    );
  }
}
