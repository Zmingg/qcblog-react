import React from 'react';
import Index from './index.jsx';
import Detail from './detail.jsx';

export default class Show extends React.Component {

	render(){
		const style = {
			detail:{
				width:'90%',
				maxWidth:'1000px',
				margin:'0 auto',
			}
		}
		return (
			<Index>
			<div style={style.detail}>
				<Detail id={this.props.match.params.id} history={this.props.history} />
			</div>
			</Index>
		)
	}

	



}