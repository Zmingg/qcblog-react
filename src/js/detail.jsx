import React from 'react';
import fetchJsonp from 'fetch-jsonp';
require('es6-promise').polyfill();
export default class Detail extends React.Component {
	constructor(props){
		super(props);
		this.state = {data:{}}
		this.getData();
	}
	render(){
		const style = {
			main:{
				width:'100%',
				background:'#f8f5f2',
				margin:'50px 0 40px 0',
				padding:'15px',
				boxSizing:'border-box',
				fontSize:'14px',
				position:'relative',
			},
			title:{
				fontSize:'20px',
				fontStyle:'italic',
				fontWeight:'bold',
				textShadow:'3px 4px 1px rgba(107, 105, 105, 0.39)',
				marginBottom:'30px',
			},
			meta:{
				width:'20%',
				position:'absolute',
				right:'20px',
				fontSize:'12px',
				fontWeight:'bold',
				lineHeight:'18px',
				textAlign:'right',
			},
			content:{
				position:'relative',
				width:'70%',
			},
			abs:{
				textIndent:'24px',
			}

		};
		const data = this.state.data; 
		data.__html = data.content;
		var user = data.user;
		return (
			<div style={style.main}>
				<div style={style.title} >
					{data.title}
				</div>
				<div style={style.meta} >
				Author：{data.user?data.user.nickname:'清尘'}<br/>
				Count：{data.click}<br/>
				Tag：{data.tags}<br/><br/>
				<div style={style.abs}>{data.abstract}</div>
				</div>
				<div style={style.content}  dangerouslySetInnerHTML={data}></div>
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