import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import style from '../css/blog.css';
import Index from './index.jsx';
require('es6-promise').polyfill();
import { Link } from 'react-router-dom';

export default class Blog extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {blogs:[],totalWidth:'',totalHeight:'500px',colWidth:'',};

    this.col = this.defaultCol = 3;
    this.gapX = 20;
    this.gapY = 30;
    this.page = 1;
    this.lock = false;
    this.heights = [];

    this.init = this.init.bind(this);
  }
  componentDidMount(){
    var total_width = this._list.clientWidth;
    var lis = this._list.getElementsByTagName('li');
    this.init();
    this.listener();
    this.getData();
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

      <Index>
      <ul ref={el=>this._list=el} className={style.list} style={styles.list}>
      {this.state.blogs.map( (blog,index) =>
        <li key={index} className={style.li} style={styles.li} >
        
        <div className={style.pic}>
          <img className={style.img} src={blog.img} />
        </div>
        <div className={style.content}>
          <Link to='/show'><p className={style.titlep}>{blog.title}</p></Link>
          <p className={style.contentp}>{blog.content}</p>
          <div className={style.meta}>

          {blog.tagsarr.map(tag=>
            <span className={style.tag}>{tag}</span> 
          )}

            <span className={style.click}>{blog.click}</span>

        </div>
        </div>
        
        </li>
      )}
      </ul>

      </Index>
    )
  }

  showBlog(id){
    window.location.href='/show'
  }

  pushBlog(data){
    this.setState((prevState)=>({blogs:prevState.blogs.concat(data)}));
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
        if (this.lock == false) {
          this.lock = true;
          this.getData();     
        }
      }
    }
    window.addEventListener('scroll',this.scrollEve);

    window.addEventListener('resize',()=>{
      this.init();
      if(!this.timerid){
        this.timerid = setTimeout(()=>{
          let lis = this._list.getElementsByTagName('li'); 
          this.waterAll(lis);
          clearTimeout(this.timerid);
          this.timerid = null;
        },500);

      }
      
    });
  }

  /*  
  * imgLoaded
  * param {object} img imageElementNode
  * param {function} cb callback
  */
  imgLoaded(img,cb){
    img.onerror=()=>{
      img.src='http://zmhjy.xyz/ass_ama/img/thumb_default.jpg';
      img.onerror=null;
    } 
    var check = setInterval(()=>{
      if (img.complete) {
        cb();
        clearInterval(check);
      }
    },100)
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
    if (i < data.length) {
      this.pushBlog([data[i]]);
      var lis = this._list.getElementsByTagName('li');
      var img = lis[lis.length-1].getElementsByTagName('img')[0];
      this.imgLoaded(img,()=>this.waterAll(lis));
      setTimeout(()=>{this.renderOneByOne(data,++i)},200);
    }
    var maxHeight = Math.max.apply(null,this.heights);
    this.setState({totalHeight:maxHeight+'px'}); 
  }

  getData(){
    var url = 'http://zmhjy.xyz/api/blogs';
    var count = 4;
    var query = '?page='+this.page+'&count='+count;
    fetchJsonp(url+query, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      mode:'no-cors',
      jsonpCallback: 'api',
    })
    .then( res => res.json() )
    .then( json => {
      var data = json.data; 
      for(var i in data){
        data[i].img = 'http://zmhjy.xyz/'+data[i].thumb_img;
        data[i].content = data[i].abstract;
      }
      this.renderOneByOne(data,0);
      this.page+=1;
      this.lock=false;
      if (json.next_page_url===null) {
        window.removeEventListener('scroll',this.scrollEve);
      }
    });
  }

}