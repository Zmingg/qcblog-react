export default (state = 0, action)=>{
  switch (action.type) {
    case 'INCREMENT':
      return state + action.num
    case 'DECREMENT':
      return state - 1
    default:
      console.log("state:"+state)
      return state
  }
}
