import { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete }) => {

  const [viewDetails, setViewDetails] = useState(false)

  const toggleDetails = () => {
    setViewDetails(!viewDetails)
  }

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
        <strong>Title:</strong>
        {blog.title}
        <strong>-  Author:</strong>
        {blog.author} {' '}
        <button onClick={toggleDetails}>{viewDetails ? 'Hide' : 'View'}</button>
      </div>
      {viewDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
          <p>Author: {blog.user ? blog.user.name : 'Unknown'}</p>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog