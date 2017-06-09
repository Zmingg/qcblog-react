import React, { Component } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Slider from './slider.jsx';


export default class Index extends Component {
  constructor(props){
    super(props);
  }
  render(){
    var imgs = [
      {src:'http://zmhjy.xyz/app/assets/img/bing-1.jpg'},
      {src:'http://zmhjy.xyz/app/assets/img/bing-2.jpg'},
      {src:'http://zmhjy.xyz/app/assets/img/bing-3.jpg'}
    ];
    var mainbg = require('../img/main-bg.png');
    const style = {
      box:{
        paddingTop:'50px',
      },
      slider:{
        backgroundColor:'#2d2d2d',
      },
      main:{
        overflow:'hidden',
        backgroundImage: 'url('+mainbg+'),url('+mainbg+')',
        backgroundRepeat: 'repeat-x, repeat-x',
        backgroundPosition: 'bottom left, top left',
      }
    }
    return (
      <div style={style.box}>
        <Header style={style.header} />
        <div style={style.slider} >
        <Slider imgs={imgs} config={{interval:3000,transition:500}} />
        </div>
        <div style={style.main}>
          {this.props.children}
        </div>
      <Footer />
      </div>
      
    )
  }

}