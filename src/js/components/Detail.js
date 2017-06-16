import React, { Component } from 'react';
import style from '../../scss/show.scss';

export default class Detail extends Component {

	componentDidUpdate(){
		window.scroll(0,0);
	}

	render(){
		if (!this.props.data) {
			return (<div></div>)
		}
		const data = this.props.data; 
		data.__html = data.content;
		return (
			<div className={style.main}>
				<div className={style.back}>
				<i className="fa fa-arrow-circle-left fa-fw" aria-hidden="true"></i>
				<a onClick={()=>this.back()}>返回</a>
				</div>
				<br/>
				<div className={style.title} >
					<a>{data.title}</a>
				</div>
				<div className={style.meta} >
				Author：{data.user?data.user.nickname:'清尘'}<br/>
				Count：{data.click}<br/>
				Tag：{data.tags}<br/><br/>
				</div>
				<div ref={(div)=>this._content=div} className={style.content}  
				  dangerouslySetInnerHTML={data}>
				</div>
				
				<div className={style.more}>
				{data.prev &&
					<a onClick={(e)=>{
						this.go(e,data.prev.id)
					}}>{'上一篇：'+data.prev.title}</a>
				}
				<br/>
				{data.next &&
					<span>
					<a onClick={(e)=>{
						this.go(e,data.next.id)
					}}>{'下一篇：'+data.next.title}</a>
					</span>
				}
				</div>
				
			</div>
		)
	}

	go(e,id){
		e.preventDefault();
		this.props.onFetch(id,()=>{
			this.props.onRoute(id);
		})
	}

	back(){
		this.props.history.go(-1);
	}

}