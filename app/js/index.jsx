import React from 'React';
export default class Blog extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
  	let blogs = this.props.blogs;
    return (
      <ul>
        {blogs.map( blog => 	
          <li key={blog.id}>
            {blog.id}--{blog.title}
          </li> 
        )}
      </ul>
    )
  }

}