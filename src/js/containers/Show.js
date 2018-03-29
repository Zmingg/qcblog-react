import React,{Component} from 'react';
import { bindActionCreators } from 'redux'
import Index from './Index';
import Detail from '../components/Detail';
import { showBlog } from '../actions'
import { connect } from 'react-redux';
import { push,replace } from 'react-router-redux'

class Show extends Component {

	constructor(props){
		super(props)
		props.disFetch(props.match.params.id)
	}

	render(){
		const { disRoute,disFetch,data,version,history,id,path } = this.props
		return (
			<div style={{minHeight:'200px'}}>
			  <Detail
			    id = { this.props.match.params.id }
			    version = { version }
			    data = { data }
				history = { history } 
				onRoute = { (id)=>disRoute('/app2/show/'+id) }
				onFetch = { (id,cb)=>disFetch(id).then(cb) }
			  />
			</div>
		)
	}

}

const mapStateToProps = (state,ownProps)=>{
	return {...state.currentBlog,
		id: ownProps.match.params.id,
    	path: ownProps.location.pathname
    }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    disFetch: bindActionCreators(showBlog, dispatch),
    disRoute: bindActionCreators(replace, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show);