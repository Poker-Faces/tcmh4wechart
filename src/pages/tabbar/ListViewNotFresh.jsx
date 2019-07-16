import React from 'react';
import { ListView } from 'antd-mobile';
import * as ReactDOM from 'react-dom';

class ListViewNotFresh extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2, // 渲染规则
    });
    this.state = {
      dataSource,
      initialListSize: 1000,
      isLoading: true,
      height: document.documentElement.clientHeight * this.props.height || 1, // * 0.62
      useBodyScroll: false,
    };
    this._data = []; // 渲染的数据
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
  //     });
  //   }
  // }

  componentDidMount() {
    console.log('首次查询了...');
    this.queryListFetch();
  }

  /**
   * 通用查询接口数据
   * @param payload
   * @returns {*}
   */
  queryListFetch = (payload = { pageRow: 1000 }) => {
    const { parm, listName, queryListFetch } = this.props;
    payload.token = '3Pbeb3ezJDoam5f8qGB';
    const parms = { ...payload, ...parm };
    return queryListFetch(parms).then(data => {
      if (data) {
        const { totalRow, gridModel } = data.data[listName];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(gridModel),
          // height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
          initialListSize: totalRow,
        });
      }
    });
  };

  /**
   * 请求新数据
   * @param event
   */
  onEndReached = event => {
    this.queryListFetch();
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const { listKey, row } = this.props;
    const { dataSource, useBodyScroll, height, initialListSize, pageSize } = this.state;
    return (
      <div style={{ height: 'auto%' }}>
        <ListView
          key={listKey}
          ref={el => (this.lv = el)}
          dataSource={dataSource}
          renderRow={row()}
          renderSeparator={separator}
          useBodyScroll={useBodyScroll}
          style={{
            height: height,
            border: '1px solid #ddd',
            margin: '5px 0',
            overflow: 'auto',
          }}
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={10}
          onEndReached={this.onEndReached} // 相当于上拉刷新
          pageSize={pageSize}
          initialListSize={initialListSize}
        />
      </div>
    );
  }
}

export default ListViewNotFresh;
