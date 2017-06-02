import React from 'react';
import fetchJsonp from 'fetch-jsonp';
require('es6-promise').polyfill();
import { Link } from 'react-router-dom';
import style from '../css/show.css';
import Prism from 'prismjs';

export default class Detail extends React.Component {
	constructor(props){
		super(props);
		this.state = {data:{}}
		this.getData();
	}
	componentDidMount(){
		var pres = this._content.getElementsByTagName('pre');
		setTimeout(()=>{
			for (var i = 0; i < pres.length; i++) {
				pres[i].className='language-markup'
			}
		},2000)
		
	}
	render(){
		const data = this.state.data; 
		data.__html = data.content;
		var user = data.user;

		return (
			<div className={style.main}>
				<div className={style.title} >
					<Link to={'/'}>{data.title}</Link>
				</div>
				<div className={style.meta} >
				Author：{data.user?data.user.nickname:'清尘'}<br/>
				Count：{data.click}<br/>
				Tag：{data.tags}<br/><br/>
				</div>
				<div ref={(div)=>this._content=div} className={style.content}  dangerouslySetInnerHTML={data}></div>
			</div>
		)
	}

	getData(){
	var url = 'http://zmhjy.xyz/api/blogshow';
    var id = this.props.id;
    var query = '?id='+id;
	fetchJsonp(url+query, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      mode:'no-cors',
      jsonpCallback: 'api',
    })
    .then( res => res.json() )
    .then( json => {
      this.setState({data:json});

    });
}
}