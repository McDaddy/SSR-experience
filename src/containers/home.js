import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from '../client/store/actions'

class Home extends Component {

  componentDidMount() {
    if (!this.props.list.length) {
        this.props.getHomeList();
    }
  }


  render() {
    const { list } = this.props;
    return (
        <div>
            <span>list</span>
            {
                list.map(item => <div key={item.id}>{item.title}</div>)
            }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList,
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList());
  }
})
//连接store
const exportHome = connect(mapStateToProps, mapDispatchToProps)(Home);

exportHome.loadData = (store) => {
    return store.dispatch(getHomeList())
}

export default exportHome;