import React from 'react';
import Index from './index.jsx';
import Detail from './detail.jsx';


export default class Show extends React.Component {
	constructor(props){
		super(props);
		this.id = 72;
	}

	componentDidMount(){

	}

	render(){
		const style = {
			detail:{
				width:'1000px',
				margin:'0 auto',
			}
		}
		return (
			<Index>
			<div style={style.detail}>
				<Detail id={this.id} />
			</div>
			</Index>
		)
	}

	



}