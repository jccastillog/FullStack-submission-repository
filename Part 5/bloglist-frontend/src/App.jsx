import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMsg, setTypeMsg] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage('Blog was created successfully!!!')
      setTypeMsg('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTypeMsg('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    if (!blog.user || !blog.user.id) {
      console.error('Error: el blog no tiene un usuario asociado')
      return
    }

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id, // Mantener la referencia al usuario
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)

      setBlogs((prevBlogs) =>
        prevBlogs
          .map((b) => (b.id === blog.id ? { ...b, likes: response.likes } : b))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      console.error('Error al actualizar los likes:', error)
    }
  }


  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este blog?')) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id)) // Actualizar el estado
      } catch (error) {
        console.error('Error al eliminar el blog:', error)
      }
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      {<Notification message={errorMessage} typeMsg={typeMsg} />}
      {!user && loginForm()}

      {user && (
        <div>
          <p>
            {user.name} logged-in
            <button type='button' onClick={handleLogout}>
              LogOut{' '}
            </button>
          </p>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={user} />
          ))}
          <br />

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <h2>'Blog app, Department of Computer Science, University of Helsinki 2024'</h2>
    </div>
  )
}

export default App
