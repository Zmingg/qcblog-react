import React,{Component} from 'react';

export default class Footer extends Component {
  render(){
    const style = {
      footer:{
        height:'100px',
        background: '#2d2d2d',
      }
    }
    return (
      <footer style={style.footer}>
        <div className="wrapper container"></div>
      </footer>
    )
  }

}