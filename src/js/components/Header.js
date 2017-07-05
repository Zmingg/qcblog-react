import React,{Component} from 'react';

export default class Header extends Component {
  render(){
    const style = {
      header:{
        width: '100%',
        height:'50px',
        background: '#2d2d2d',
        boxShadow: '0px 3px 5px 0px rgba(21, 21, 21, 0.75)',
        zIndex: 9999,
        position: 'fixed',
        top:0,
        textAlign:'center',
        fontSize:'20px',
        fontStyle:'italic',
        fontFamily:'Tahoma,Arial,"Helvetica Neue","Hiragino Sans GB",Simsun,sans-self',
        color:'#dcdcdc',
        lineHeight:'50px',
      }
    }
    return (
      <header style={style.header}>
        <a>清 尘 居</a>
      </header>
    )
  }

}