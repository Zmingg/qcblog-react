import React from 'react';

export default class Slider extends React.Component {
  constructor(props){
    super(props);
  	this.imgs = this.props.imgs;
    this.interval = this.props.config.hasOwnProperty("interval")?this.props.config.interval:2000;
    this.transition = this.props.config.hasOwnProperty("transition")?this.props.config.transition:1000;
    this.curIndex = 0;
    this.nextIndex = 1
    this.prevIndex = this.imgs.length-1;
    this.changeImage = this.changeImage.bind(this);
    this.state = {height:''};
  }

  componentDidMount(){
    this['li'+this.curIndex].style.zIndex = 102;
    this['li'+this.nextIndex].style.opacity = 0;
    this.intervalId = setInterval(this.changeImage,this.interval);
    var img = this['li'+this.curIndex].getElementsByTagName('img')[0];
    var check = setInterval(()=>{
      if (img.complete) {
        this.setState({height:this['li'+this.curIndex].offsetHeight+'px'});
        clearInterval(check);
      }
    },100)
    
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  changeImage(){
    this.prevIndex = this.curIndex;
    this.curIndex = this.nextIndex;
    if (this.nextIndex<(this.imgs.length-1)) {
      this.nextIndex++;
    }else{
      this.nextIndex=0;
    }
    this['li'+this.prevIndex].style.zIndex = 101;
    this.timerid = setTimeout(()=>{
      this['li'+this.prevIndex].style.zIndex = 100;
      clearTimeout(this.timerid);
    },this.transition);

    this['li'+this.curIndex].style.zIndex = 102;
    this['li'+this.curIndex].style.opacity = 1;
    this['li'+this.nextIndex].style.opacity = 0;
  }


  render(){
    const styles = {
      slider:{
        height:this.state.height,
        margin:'0 auto',
        width:'100%',
        maxWidth:'1000px',
        listStyleType:'none',
        background:'#333',
        backgroundColor:'#333',
      },
      ul:{
        position:'relative',
      },
      li:{
        fontSize:0,
        width:'100%',
        transition:this.transition+'ms',
        position:'absolute',
        zIndex:100,
        opacity:1,
      },
      img:{
        width:'100%',
      }
    }
  	return (
      <div className="slider" style={styles.slider}>
        <ul style={styles.ul}>
        {this.imgs.map((img,index) =>
          <li style={styles.li} key={index} ref={el=>this['li'+index]=el}>
            <img src={img.src} style={styles.img} />
          </li>
        )}

        </ul>
      </div>
  	)
  }

}