import Home from './containers/home';
import Login from './containers/login';

export default [
{
  path: "/",
  component: Home,
  exact: true,
  loadData: Home.loadData,//服务端获取异步数据的函数
  key: 'home'
},
{
  path: '/login',
  component: Login,
  exact: true,
  key: 'login'
}];
