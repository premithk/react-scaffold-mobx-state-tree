import * as React from "react";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import { IAppStore } from './models/AppStore'
import { DashboardPage, TodoPage, NotFoundPage, AboutPage, LoginPage} from './containers';
import {MainNavigation, BreadCrumbs, PrivateRoute} from './components';
import { Layout, Menu, Icon, Avatar, Badge, Dropdown } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

interface ILayoutProps {
  appStore: IAppStore,
  match: any,
  location: any,
  history: any
}

// This page creates the basic layout of the application
// along with the various routes (pages) used within the app.

class AppLayout extends React.Component<ILayoutProps, {}> {

  state = {
    collapsed: false,
  };

  menu = (
    <Menu style={{background:'#fff'}}>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#"><Icon type="profile" /> Manage Profile</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="javascript:void(0)" onClick={() => { this.logout() }}><Icon type="lock" /> Sign Out</a>
      </Menu.Item>
    </Menu>
  )

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    this.props.appStore.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <Layout>

        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <MainNavigation></MainNavigation>
        </Sider>

        <Layout>
          <Header className="header">
            <div className="icon-button" onClick={this.toggle}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              />
            </div>
            <div className="hbox">
              <div className="icon-button">
                <Icon type="mail" />
              </div>
              <Dropdown overlay={this.menu}>
                <div className="icon-button">
                  <Avatar icon="user" />
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content>
            <BreadCrumbs></BreadCrumbs>
            <Provider appStore={this.props.appStore}>
              <Switch>
                <Route path='/login' component={LoginPage} />
                <Route exact path='/' render={() => (<Redirect to="/dashboard" />)} />
                <PrivateRoute path='/dashboard' component={DashboardPage} />
                <PrivateRoute path='/task' component={TodoPage} />
                <PrivateRoute path='/about' component={AboutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Provider>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Acuity Technology Group 2018 ©, All Rights Reserved</Footer>

        </Layout>
      </Layout>
    )

  }
}

export default withRouter(AppLayout);