//actions.js
import axios from 'axios';
import { CHANGE_LIST } from "./constants";

//普通action
const changeList = list => ({
  type: CHANGE_LIST,
  list
});
//异步操作的action(采用thunk中间件)
export const getHomeList = (server) => {
  return (dispatch, getState, axiosInstance) => {
      console.log(666);
      
    return axiosInstance.get('/api/news.json')
      .then((res) => {
        const list = res.data.data
        dispatch(changeList(list))
      });
  };
};
