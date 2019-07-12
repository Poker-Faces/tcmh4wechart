import React from 'react';
import withRouter from 'umi/withRouter';
import { TabBar, Popover, Icon } from 'antd-mobile';
import router from 'umi/router';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/exception/403';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import theme from '../theme';
import styles from './TabBarLayout.less';

class TabBarLayout extends React.PureComponent {
  state = {
    visible: true,
    // eslint-disable-next-line react/no-unused-state
    selected: '',
  };

  /**
   * 获取路由访问权限
   * @param pathname
   * @param routeData
   * @returns {string[]}
   */
  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  /**
   * 获取 路由配置中带有 NAME 属性的路由信息
   * @param routes
   */
  getTabBarItems = routes => {
    if (routes && typeof routes === 'object') {
      return (routes || []).filter(item => item.title !== undefined);
    }
    return [];
  };

  /**
   * 渲染 组件
   * @param children
   * @param pathname
   * @param routes
   * @returns {*}
   */
  getChildrenContent = (children, pathname, routes) => {
    const tabBarItems = this.getTabBarItems(routes);
    const routerConfig = this.getRouterAuthority(pathname, routes);
    let tabBarItem = [];
    if (tabBarItems && tabBarItems.length > 0) {
      tabBarItem = tabBarItems.map(item => (
        <TabBar.Item
          title={item.title}
          key={`tab-bar-item-${item.path}`}
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background: `url(${require(`../assets/tarbar/${item.iconName ||
                  item.title}-un.svg`)}) center center /  21px 21px no-repeat`,
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background: `url(${require(`../assets/tarbar/${item.iconName ||
                  item.title}.svg`)}) center center /  21px 21px no-repeat`,
              }}
            />
          }
          selected={pathname === item.path}
          badge={0}
          onPress={() => {
            router.push(item.path);
          }}
          data-seed="logId"
        >
          <Authorized authority={routerConfig} noMatch={<Exception403 />}>
            {children}
          </Authorized>
        </TabBar.Item>
      ));

      return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
          >
            {tabBarItem}
          </TabBar>
        </div>
      );
    }
    router.push('/404');
    return <></>;
  };

  render() {
    const {
      children,
      location: { pathname },
      route: { routes },
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>{this.getChildrenContent(children, pathname, routes)}</div>
      </div>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(TabBarLayout));
