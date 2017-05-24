import React from 'react';
export default class Blog extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.water();
  }
  render(){
  	const blogs = this.props.blogs;
    const styles = {
      list: {
        width: '60%',
        listStyleType:'none',
        margin: '40px auto',
        position: 'relative',
      },
      li: {
        background: '#f8f5f2',
        boxShadow:'0px 1px 10px 0px #111',
        position:'absolute',
        opacity: 0,
        transition: '1s',
      },
      img: {
        width:'100%',
        height: 'auto',
      },
      content: {
        padding:'5px',
      }
    }
    return (
      <ul id="list" style={styles.list}>
      {blogs.map( (blog,index) =>
        <li style={styles.li} key={index}>
        <div className="item-pic">
          <img src={blog.img} style={styles.img}/>
        </div>
        <div className="item-content" style={styles.content}>
          <a className="item-title"><p>{blog.title}</p></a>
          <p>{blog.content}</p>
        </div>
        </li>
      )}
      </ul>
    )
  }

  water(){
    var total_width = document.getElementById('list').clientWidth;
    var lis = document.getElementById('list').getElementsByTagName('li');
    var col = 3;
    var gap_x = 20;
    var gap_y = 30;
    var col_width = Math.floor((total_width-(col-1)*gap_x)/col);
    var col_heights = Array(col);

    var data = [{title:'TITLE X',content:'DATA:Tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.',img:'file:///C:/Usesrs/Blank87/Desktop/Tools/theme/%E6%B6%82%E9%B8%A6%E7%80%91%E5%B8%83%E6%B5%81HTML5%E7%BD%91%E7%AB%99%E6%A8%A1%E6%9D%BF/%E6%B6%82%E9%B8%A6%E7%80%91%E5%B8%83%E6%B5%81HTML5%E7%BD%91%E7%AB%99%E6%A8%A1%E6%9D%BF/img/dummies/featured/01.jpg'}];
    for (var i = 0; i < 3; i++) {
      data[data.length]=data[0];
    }

    initCol();
    loadMore(data,0);

    function initCol(){
      for (var i = 0; i < col; i++) {
        col_heights[i] = 0;
      }
      for (var i = 0; i < col; i++) {

        lis[i].style.width = col_width+'px';
        lis[i].style.top = "0"; 
        lis[i].style.left = (col_width+gap_x) * i + "px"; 
        lis[i].style.opacity = "1"; 
        lis[i].style["-moz-opacity"] = "1"; 
        lis[i].style["filter"] = "alpha(opacity=100)"; 
        col_heights[i]=lis[i].clientHeight;
      }
      for (var i = col; i < lis.length; i++) {
        waterItem(lis[i]);
      }
    }

    function findMinHeightCol(){
      var minHeight = Math.min.apply(null,col_heights);
      for(var i in col_heights){
        if (col_heights[i] == minHeight){
          return [i,minHeight];
        }   
      }
    }

    function waterItem(item){
      item.style.width = col_width+'px';
      var maxHeight = Math.max.apply(null,col_heights);
      var col_num = findMinHeightCol()[0];
      item.style.top = maxHeight+'px';
      item.style.left = Math.random()*400+'px';
      item.style.opacity = "0.3"; 
      col_heights[col_num] += 500;
      document.getElementById('list').style.height = maxHeight+'px';

      imgLoaded(item.children[0].children[0],function(){
        waterAll();
      });
    }

      function waterAll(){
        col_heights = [0,0,0];
        for (var i = 0; i < lis.length-1; i++) {
        var col_num = findMinHeightCol()[0];
        var col_height = findMinHeightCol()[1];
        var left = (col_width+gap_x)*col_num+'px';
        var top = col_height+gap_y+'px';
        lis[i].style.top = top;
        lis[i].style.left = left;
        lis[i].style.opacity = "1"; 
        col_heights[col_num] += lis[i].clientHeight+20;
      }
      var maxHeight = Math.max.apply(null,col_heights);
        document.getElementById('list').style.height = maxHeight+'px';

      }

      /*  imgLoaded(img,cb)
      * img  ElementNode
      * cb  Function  callback
       */
    function imgLoaded(img,cb){
      img.onerror=function(){
        img.src='file:///C:/Users/Blank87/Desktop/Tools/theme/%E6%B6%82%E9%B8%A6%E7%80%91%E5%B8%83%E6%B5%81HTML5%E7%BD%91%E7%AB%99%E6%A8%A1%E6%9D%BF/%E6%B6%82%E9%B8%A6%E7%80%91%E5%B8%83%E6%B5%81HTML5%E7%BD%91%E7%AB%99%E6%A8%A1%E6%9D%BF/img/dummies/featured/01.jpg';
        img.onerror=null;
      } 
      var check = setInterval(function(){
        if (img.complete) {
          cb();
          clearInterval(check);
        }
      },100)
    }

    function loadMore(arr,i){    
          if (i<arr.length) {
            setTimeout(function(){
                var li = list.children[list.children.length-1];
                list.appendChild(li.cloneNode(true));
                li.children[0].children[0].src = arr[i].img;
                li.children[1].children[0].children[0].innerHTML = arr[i].title;
                li.children[1].children[1].innerHTML = arr[i].content;
                li.removeAttribute('style');
                waterItem(li)
                i++;
                loadMore(arr,i)
              },50);
          }       
    }
    
    var page =1;
    var time = new Date();

    window.addEventListener('scroll',function(){
      console.log(111)
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop >= document.body.clientHeight-window.screen.height-200){
        var _time = new Date();
        if (_time-time>300) {
          time = _time;
          getData();
        }
      }
    });

    window.addEventListener('resize',function(){
      total_width = document.getElementById('list').clientWidth;
      col_width = Math.floor((total_width-(col-1)*gap_x)/col);
      initCol();
      setTimeout(function(){waterAll()},1000);
    });

    function getData(){
      
      function getItems(){}

      ajax({     
        url: 'http://laravel.cc/api/blogs',    // 请求地址  
        jsonp: "getItems",  // 采用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串  
        data: {page:page,count:4},   // 传输数据  
        success:function(res){   // 请求成功的回调函数 
          var data = res.data; 
          for(var i in data){
            data[i].img = 'http://laravel.cc/'+data[i].thumb_img;
            data[i].content = data[i].abstract;
          }
          page+=1;
        loadMore(data,0);          
        },  
        error: function(error) {console.log('fail'); }   // 请求失败的回调函数  
      });  
    }

    function ajax(params) {     
      params = params || {};     
      params.data = params.data || {};     
      var json = params.jsonp ? jsonp(params) : json(params);        
      // jsonp请求     
      function jsonp(params) {     
      //创建script标签并加入到页面中     
      var callbackName = params.jsonp;     
      var head = document.getElementsByTagName('head')[0];     
      // 设置传递给后台的回调参数名     
      params.data['api'] = callbackName;     
      var data = formatParams(params.data);     
      var script = document.createElement('script');     
      head.appendChild(script);      
      //创建jsonp回调函数     
      window[callbackName] = function(json) {     
        head.removeChild(script);     
        clearTimeout(script.timer);     
        window[callbackName] = null;     
        params.success && params.success(json);     
      };      
      //发送请求     
      script.src = params.url + '?' + data;      
        //为了得知此次请求是否成功，设置超时处理     
        if(params.time) {     
          script.timer = setTimeout(function() {     
            window[callbackName] = null;     
            head.removeChild(script);     
            params.error && params.error({     
              message: '超时'     
            });     
          }, time);     
        }     
      };      
      //格式化参数     
      function formatParams(data) {     
        var arr = [];     
        for(var name in data) {     
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));     
      };     
      // 添加一个随机数，防止缓存     
      arr.push('v=' + random());     
        return arr.join('&');     
      }     
      // 获取随机数     
      function random() {     
        return Math.floor(Math.random() * 10000 + 500);     
      }  
    }

  };

}