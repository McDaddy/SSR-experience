import { CHANGE_LIST } from "./constants";

const defaultState = {
  name: 'cc',
  newsList: []
};

export default (state = defaultState, action) => {
    console.log('action', action);
    
  switch(action.type) {
    case CHANGE_LIST:
      const newState = {
        ...state,
        newsList: action.list
      };
      return newState;
    default:
      return state;
  }
}