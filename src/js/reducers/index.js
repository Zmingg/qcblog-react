import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
function getBlogs(state = {
  isFetching: false,
  hasMore: true,
  items: []
}, action) {
  switch (action.type) {
    case 'RequestFetch':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'ReceiveData':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        hasMore: action.hasMore,
        lastUpdated: action.receivedAt
      })

    default:
      return state
  }
}

function blogsPush(state = {}, action) {
  switch (action.type) {
    case 'RequestFetch':
    case 'ReceiveData':
      return Object.assign({}, state, getBlogs(state, action))
    default:
      return state
  }
}

function currentBlog(state = {isFetching:false}, action){
  switch (action.type) {
    case 'RequestOne':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'ReceiveOne':
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        version: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  blogsPush,
  currentBlog,
  router: routerReducer
})



export default rootReducer