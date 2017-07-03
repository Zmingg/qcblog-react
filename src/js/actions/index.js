import fetch from 'isomorphic-fetch'


const requestFetch = ()=>{
  return {
    type: 'RequestFetch'
  }
}
const receiveData = (json)=>{
  return {
    type: 'ReceiveData',
    posts: json.data.map(child => child),
    hasMore: (json.current_page < json.last_page),
    receivedAt: Date.now()
  }
}

const shouldFetch = (state)=>{
  const posts = state.blogsPush.posts
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return true
  }
}

const fetchBlogs = (page)=>{
	let formData = new FormData();  
	formData.append("count",4);  
	formData.append("page",page);  
	return (dispatch)=>{
  	  dispatch(requestFetch());
      return fetch('//zmhjy.xyz/rapi/blogs',{
      	method:'POST',
      	body:formData
      })
        .then( response => response.json() )
        .then( json => {
        	dispatch(receiveData(json)) 
        })
    }
}

export const getHotBlogs = (page)=>{

	return (dispatch,getState) => {
		if (shouldFetch(getState())) {
		  return dispatch(fetchBlogs(page))
    } else {
      return Promise.resolve()
    }
		
	}
}


const requestOne = ()=>{
  return {
    type:'RequestOne'
  }
}

const receiveOne = (json)=>{
  return {
    type:'ReceiveOne',
    data:json,
    receivedAt: Date.now()
  }
}

const shouldFetchOne = (state)=>{
  const data = state.currentBlog.data
  if (!data) {
    return true
  } else if (data.isFetching) {
    return false
  } else {
    return true
  }
}

const fetchOne = (id)=>{
  return (dispatch)=>{
    return fetch('http://zmhjy.xyz/rapi/showBlog?id='+id)
    .then( response => response.json() )
    .then( json => {
      dispatch(receiveOne(json)) 
    })

  }
  
}

export const showBlog = (id)=>{

  return (dispatch,getState) => {
    if (shouldFetchOne(getState())) {
      return dispatch(fetchOne(id))
    } else {
      return Promise.resolve()
    }
    
  }
}