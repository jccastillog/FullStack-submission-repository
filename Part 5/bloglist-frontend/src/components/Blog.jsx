import { useState } from "react";


const Blog = ({ blog }) => {

  const [viewDetails, setViewDetails] = useState(false)

  const toggleDetails = () => {
    setViewDetails(!viewDetails); 
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#f0f0f0'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} {" "}
        <button onClick={toggleDetails}>{viewDetails ? "Hide" : "View"}</button>
      </div> 
      {viewDetails && ( 
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button>Like</button></p> 
          <p>Author: {blog.author}</p>
        </div>
      )} 
    </div>
  );
};

export default Blog