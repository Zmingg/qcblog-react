import React, { Component } from 'react';
import style from '../../scss/blog.scss';
import { Link } from 'react-router-dom';
const defaultImg = require('../../img/thumb_default.jpg');

export default class Bloglist extends Component {
  constructor(props){
    super(props);
    this.state = {
      blogs:[],
      totalWidth:'',
      totalHeight:'500px',
      colWidth:'',
    };  
    this.col = this.defaultCol = 3;
    this.gapX = 20;
    this.gapY = 30;
    this.page = 1;
    this.heights = []
  }

  componentDidMount(){ 
    this.init();
    this.listener();
    this.pushBlog();
  }
  componentWillUnmount(){
    clearTimeout(this.timmerOneByOne);
    this.loading.removeEventListener('transitionend',this.transitionEnd);
    window.removeEventListener('scroll',this.scrollEve);
    window.removeEventListener('resize',this.resizeEve);
  }
  render(){
    const styles = {
      li: {
        width:this.state.colWidth,
      },
      list: {
        height:this.state.totalHeight,
      }
    }

    return (
    <div>
      <ul ref={el=>this._list=el} className={style.list} style={styles.list}>
      {this.state.blogs.map( blog=>
        <li key={blog.id} className={style.li} style={styles.li} onClick={()=>this.showBlog(blog.id)}>
        
        <div className={style.pic}>
          <img src={'http://zmhjy.xyz/'+blog.thumb_img} />
        </div>
        <div className={style.content}>
          <p className={style.title}>{blog.title}</p>
          <p>{blog.abstract}</p>
          <div className={style.meta}>

          {blog.tagsarr.map( tag=>
            <span key={tag} className={style.tag}>{tag}</span> 
          )}
            <span className={style.click}>{blog.click}</span>
        </div>
        </div> 
        <div className={style.shade}><span>QC.TEC</span></div>


        </li>
      )}
      </ul>
      <div className={style.loading} style={styles.loading} ref={(el)=>{this.loading=el}}>
        <i></i><i></i><i></i><i></i><i></i>
      </div>
    </div>
    )
  }

  showBlog(id){
    this.props.onShow('/app2/show/'+id);
  }

  pushBlog(){
    this.loading.style.display = '';
    this.loading.style.opacity = 1;
    this.props.onFetch(this.page,()=>{
      this.page++;
      this.imgLoaded(this.props.blogs,()=>{
        window.loading += 30;
        this.loading.style.opacity = 0;
        this.renderOneByOne(this.props.blogs,0);
      })
      
    })
  }

  init(){
    if (this._list.clientWidth<640){
      this.col = 2;
    }else if(this._list.clientWidth<768){
      this.col = 2;
    }else{
      this.col = this.defaultCol;
    }
    this.setState({colWidth:Math.floor((this._list.clientWidth-(this.col-1)*this.gapX)/this.col)});
    this.heights = Array(this.col);
  }

  listener(){
    this.scrollEve = ()=>{
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop >= document.body.clientHeight-window.screen.height-200){
        if (this.props.isFetching == false&&this.props.hasMore == true) {
        if(new Date().getTime()-this.props.lastUpdated>500)
          this.pushBlog();   
        }
        
      }
    }
    window.addEventListener('scroll',this.scrollEve);

    this.resizeEve = ()=>{
      this.init();
      if(!this.timerid){
        this.timerid = setTimeout(()=>{
          let lis = this._list.getElementsByTagName('li'); 
          this.waterAll(lis);
          clearTimeout(this.timerid);
          this.timerid = null;
        },500);
      }   
    }
    window.addEventListener('resize',this.resizeEve);

    this.transitionEnd = (e)=>{
      if(e.propertyName=='opacity'&&this.loading.style.opacity==0){
        this.loading.style.display = 'none';
      }
    }
    this.loading.addEventListener('transitionend',this.transitionEnd);

    
  }

  /*  
  * imgLoaded
  * param {array} datas 
  * param {function} cb callback
  */
  imgLoaded(datas,cb){
    var num = 0;
    var length = datas.length;
    for (let i in datas) {
      let img = new Image();
      img.onerror = function(){
        datas[i].thumb_img = 'ass_ama/img/thumb_default.jpg';
        img.onerror = null;
        num++;
        num>=length&&cb();
      }
      img.onload = function(){
        img.onload = null;
        num++;
        num>=length&&cb();
      }   
      img.src = 'http://zmhjy.xyz/'+datas[i].thumb_img;
    }
    
  }

  waterAll(eles){
      var changeStyle =(ele)=>{
        var minCol = this.findMinHeight()[0];
        var minHeight = this.findMinHeight()[1];
        ele.style.top = minHeight+'px';
        ele.style.left = (this.state.colWidth+this.gapX)*minCol+'px';
        ele.style.opacity = "1";
        this.heights[minCol] += (ele.clientHeight + this.gapY);
      }
      for (var i = 0; i < this.heights.length; i++) {
        this.heights[i] = 0;
      }
      for (var i = 0; i < eles.length; i++) {
        changeStyle(eles[i]);
      }
          
  }

  findMinHeight(){
    var minHeight = Math.min.apply(null,this.heights);
    for(var i in this.heights){
      if (this.heights[i] == minHeight){
        return [i,minHeight];
      }
    }
  }

  renderOneByOne(data,i){ 
    this.setState(
      (prevState)=>({blogs:prevState.blogs.concat([data[i]])})
    );
    var lis = this._list.getElementsByTagName('li');
    this.waterAll(lis);
    if (i < data.length-1) {
      this.timmerOneByOne = setTimeout(()=>{this.renderOneByOne(data,++i)}, 200);
    }
    var maxHeight = Math.max.apply(null,this.heights);
    this.setState({totalHeight:maxHeight+'px'}); 
  }

}