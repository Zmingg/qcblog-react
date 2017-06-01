import React from 'react';
import Blog from './blog.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Slider from './slider.jsx';

export default class Index extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    var imgs = [
      {src:'http://zmhjy.xyz/app/assets/img/bing-1.jpg'},
      {src:'http://zmhjy.xyz/app/assets/img/bing-2.jpg'},
      {src:'http://zmhjy.xyz/app/assets/img/bing-3.jpg'}
    ];
    const style = {
      box:{
        paddingTop:'50px',
      },
      header:{

      },
      slider:{
        backgroundColor:'#2d2d2d',
      },
      main:{
        overflow:'hidden',
        backgroundImage: 'url(img/main-bg.png), url(img/main-bg.png)',
        backgroundRepeat: 'repeat-x, repeat-x',
      }
    }
    return (
      <div style={style.box}>
      <div style={style.header}>
        <Header />
        <div style={style.slider}>
          <Slider imgs={imgs} config={{interval:3000,transition:500}} />
        </div>
      </div>
      <div style={style.main}>
        {this.props.children}
      </div>
      <Footer />
      </div>
      
    )
  }

}