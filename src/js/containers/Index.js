import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';


export default class Index extends Component {
  constructor(props){
    super(props);
  }
  render(){
    var imgs = [
      {src:'http://p04p94ehj.bkt.clouddn.com/slider/slider_1.jpg'},
      {src:'http://p04p94ehj.bkt.clouddn.com/slider/slider_2.jpg'},
      {src:'http://p04p94ehj.bkt.clouddn.com/slider/slider_3.jpg'}
    ];
    var mainbg = require('../../img/main-bg.png');
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