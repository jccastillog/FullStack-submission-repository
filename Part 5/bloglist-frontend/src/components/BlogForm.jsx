import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          data-testid='title'
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder='write title here'
        />{' '}
        <br />
        Author:
        <input
          data-testid='author'
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder='write author here'
        />{' '}
        <br />
        Url:
        <input
          data-testid='url'
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder='write url here'
        />{' '}
        <br />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
