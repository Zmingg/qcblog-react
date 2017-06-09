import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
require('es6-promise').polyfill();
import { Link } from 'react-router-dom';
import style from '../css/show.css';
import Prism from 'prismjs';

export default class Detail extends Component {
	constructor(props){
		super(props);
		this.state = {data:{}}
		this.getData(this.props.id);
	}
	componentWillReceiveProps(nextProps){
		this.getData(nextProps.id);
	}
	componentDidUpdate(){
		if (this.update===true) {
			window.scroll(0,0);
			this.update=false;
		}	
	}
	render(){
		const data = this.state.data; 
		data.__html = data.content;
		return (
			<div className={style.main}>
				<a href='' onClick={(e)=>this.back(e)}>{`<— 返回`}</a>
				<br/>
				<div className={style.title} >
					<Link to={'/'}>{data.title}</Link>
				</div>
				<div className={style.meta} >
				Author：{data.user?data.user.nickname:'清尘'}<br/>
				Count：{data.click}<br/>
				Tag：{data.tags}<br/><br/>
				</div>
				<div ref={(div)=>this._content=div} className={style.content}  dangerouslySetInnerHTML={data}></div>
				
				<div className={style.more}>
				{data.prev &&
					<Link to={'/show/'+data.prev.id} replace>{'上一篇：'+data.prev.title}</Link>
				}
				<br/>
				{data.next &&
					<Link to={'/show/'+data.next.id} replace>{'下一篇：'+data.next.title}</Link>
				}
				</div>
				
			</div>
		)
	}

	back(e){
		e.preventDefault();
		this.props.history.go(-1);
	}

	getData(id){
	var url = 'http://zmhjy.xyz/api/blogshow';
    var query = '?id='+id;
	fetchJsonp(url+query, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      mode:'no-cors',
      jsonpCallback: 'api',
    })
    .then( res => res.json() )
    .then( json => {
      this.update = true;
      this.setState({data:json});
    });
}
}