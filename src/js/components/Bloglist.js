import React, { Component } from 'react';
import style from '../../scss/blog.scss';
import { Link } from 'react-router-dom';
const defaultImg = require('../../img/thumb_default.jpg');

export default class Bloglist extends Component {
  constructor(props){
    super(props);
    this.state = {
      blogs:[],
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.blogs!==this.state.blogs) {
      return true;
    }else if(this.state.blogs.length&&nextState.colWidth!==this.state.colWidth){
      return true;
    }else{
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let lis = this._list.getElementsByTagName('li');
    let lastli = lis[lis.length-1];
    let img = lastli.getElementsByTagName('img')[0];
    img.onload=()=>{
      img.onload = null;
      this.water(lastli);
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timmerOneByOne);
    this.loading.removeEventListener('transitionend',this.transitionEnd);
    this.loading.removeEventListener('webkitTransitionEnd',this.transitionEnd);
    window.removeEventListener('scroll',this.scrollEve);
    window.removeEventListener('resize',this.resizeEve);
  }

  render(){
    const styles = {
      li: {
        width:this.state.colWidth,
        opacity:0,
      }
    }

    return (
    <div>
      <ul ref={el=>this._list=el} className={style.list}>
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
        <i></i><i></i><i></i><i></i><i></i><i></i>
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
    this.isLoading = true;
    this.props.onFetch(this.page,()=>{
      this.page++;
      this.imgLoaded(this.props.blogs,()=>{
        this.page==2&&(window.loading += 30);
        this.loading.style.opacity = 0;
        this.renderOneByOne(this.props.blogs);
        this.isLoading = false;
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
    for (let i = 0; i < this.heights.length; i++) {
      this.heights[i] = 0;
    }
  }

  listener(){
    this.scrollEve = ()=>{
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop >= document.body.clientHeight-window.screen.height-200){
        if (!this.props.isFetching&&!this.isLoading&&this.props.hasMore) {
        if(new Date().getTime()-this.props.lastUpdated>500)
          this.pushBlog();   
        }
      }
    }
    window.addEventListener('scroll',this.scrollEve);

    this.resizeEve = ()=>{
      if(!this.timerid){
        this.timerid = setTimeout(()=>{
          this.init();
          let lis = this._list.getElementsByTagName('li');
          for (let i = 0; i < lis.length; i++) {
            this.water(lis[i]);
          }
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
    this.loading.addEventListener('webkitTransitionEnd',this.transitionEnd);
    
  }

  imgLoaded(datas,cb){
    let num = 0;
    let length = datas.length;
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
      img.src = 'http:\/\/zmhjy\.xyz\/'+datas[i].thumb_img;
    } 
  }

  water(el){
    let minCol = this.findMinHeight()[0];
    let minHeight = this.findMinHeight()[1];
    el.style.top = minHeight+'px';
    el.style.left = (this.state.colWidth+this.gapX)*minCol+'px';
    let timerOp = setTimeout(()=>{
      el.style.opacity = 1;
      clearTimeout(timerOp);
    },100)
    this.heights[minCol] += (el.clientHeight + this.gapY);
    let maxHeight = Math.max.apply(null,this.heights);
    this._list.style.height = maxHeight+'px';
  }

  findMinHeight(){
    let minHeight = Math.min.apply(null,this.heights);
    for(let i in this.heights){
      if (this.heights[i] == minHeight){
        return [i,minHeight];
      }
    }
  }

  renderOneByOne(data){ 
    let i = 0;
    this.timmerOneByOne=setInterval(()=>{
      if (i<data.length){
        this.setState(
          (prevState)=>({blogs:prevState.blogs.concat([data[i]])})
        );
        i++;
      } else {
        clearInterval(this.timmerOneByOne);
      }
    },100);

  }
}