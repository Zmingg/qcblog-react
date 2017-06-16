import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { getHotBlogs,showBlog } from '../actions';
import Index from '../components/Index';
import Bloglist from '../components/Bloglist' 
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
    items:blogs,
    hasMore,
    lastUpdated
  } = state.blogsPush || { items:[] }
  return {
    isFetching,
    blogs,
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