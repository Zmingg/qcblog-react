import React from 'react';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const style = {
      header:{
        width: '100%',
        height:'50px',
        background: '#2d2d2d',
        boxShadow: '0px 6px 12px 3px rgba(21, 21, 21, 0.75)',
        zIndex: 9999,
        position: 'fixed',
        top:0,
      }
    }
    return (
      <header style={style.header}>

      </header>
    )
  }

}