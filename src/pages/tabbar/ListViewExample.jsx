import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import * as ReactDOM from 'react-dom';

class ListViewExample extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2, // 渲染规则
    });
    this.state = {
      dataSource,
      refreshing: false,
      isLoading: true,
      height: document.documentElement.clientHeight * this.props.height || 1, // * 0.62
      useBodyScroll: false,
      hasMore: true,
      pageSize: 10,
      currentPage: 1,
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
  queryListFetch = (payload = { pageRow: 10 }) => {
    const { index, listName, queryListFetch } = this.props;
    payload.currentPage = this.state.currentPage;
    payload.token = '3Pbeb3ezJDoam5f8qGB';
    payload.index = index; // table类型
    return queryListFetch(payload).then(data => {
      if (data) {
        const { totalRow, currentPage, pageRow, gridModel, totalPage } = data.data[listName];
        let hasData = false;
        if (currentPage < totalPage) {
          hasData = true;
        }
        if (currentPage > 1) {
          this._data = this._data.concat(gridModel);
        } else {
          this._data = gridModel;
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._data),
          isLoading: hasData,
          refreshing: false, // 是否显示刷新动画
          pageSize: pageRow,
          // height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
          hasMore: hasData, // 还有更多数据
        });
      }
    });
  };

  /**
   * 第一页下拉刷新数据
   */
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true, currentPage: 1 });
    // simulate initial Ajax
    this.queryListFetch();
  };

  /**
   * 请求新数据
   * @param event
   */
  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    this.setState({ isLoading: true, currentPage: this.state.currentPage + 1 });
    if (this.state.hasMore) {
      this.queryListFetch();
    } else {
      this.setState({
        refreshing: false,
        isLoading: false,
        currentPage: this.state.currentPage - 1,
      });
    }
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
    const { dataSource, isLoading, useBodyScroll, height, refreshing, pageSize } = this.state;
    return (
      <ListView
        key={listKey}
        ref={el => (this.lv = el)}
        dataSource={dataSource}
        // renderHeader={() => <span>下拉刷新</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {isLoading ? '加载中...' : '暂无更多数据...'}
          </div>
        )}
        renderRow={row()}
        renderSeparator={separator}
        useBodyScroll={useBodyScroll}
        style={{
          height: height,
          bottom: '0px',
        }}
        pullToRefresh={
          // 默认下拉刷新
          <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} damping={200} />
        }
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={10}
        onEndReached={this.onEndReached} // 相当于上拉刷新
        pageSize={pageSize}
      />
    );
  }
}

export default ListViewExample;
