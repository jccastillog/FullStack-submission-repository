import { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {

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

  const isOwner = currentUser?.username === blog.user?.username

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <strong>Title:</strong>
        <p data-testid="blog-title">{blog.title}</p>
        <strong>-  Author:</strong>
        <p data-testid="blog-author"> {blog.author}</p> {' '}
        <button onClick={toggleDetails}>{viewDetails ? 'Hide' : 'View'}</button>
      </div>
      {viewDetails && (
        <div className="blog-details">
          <p>URL: {blog.url}</p>
          <p data-testid="blog-likes">Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
          <p>Author: {blog.user ? blog.user.name : 'Unknown'}</p>
          {isOwner && <button onClick={() => handleDelete(blog.id)}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog