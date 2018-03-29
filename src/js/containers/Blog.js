import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { getHotBlogs } from '../actions';
import Bloglist from 'Components/Bloglist';

class Blog extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { disFetch,disShow,blogs,isFetching,hasMore,lastUpdated } = this.props;
    return (
      <Bloglist
        {...{blogs,isFetching,hasMore,lastUpdated}}
        onFetch = { (page,cb)=>disFetch(page).then(cb) }
        onShow = { (route)=>disShow(route) }
      />
    )
  }

}

const mapStateToProps = (state)=>{
  const {
    isFetching,
    items: posts,
    hasMore,
    lastUpdated
  } = state.blogsPush || { items:[] }
  console.log(state)
  return {
    isFetching,
      posts,
    hasMore,
    lastUpdated
  }
}


const mapDispatchToProps = (dispatch)=>{
  return {
    disFetch: bindActionCreators(getHotBlogs, dispatch),
    disShow: bindActionCreators(push, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog);