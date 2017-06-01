import React from 'react';

export default class Footer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const style = {
      footer:{
        height:'150px',
        background: '#2d2d2d',
      }
    }
    return (
      <footer style={style.footer}>
        <div className="wrapper container">
          
        </div>
      </footer>
    )
  }

}