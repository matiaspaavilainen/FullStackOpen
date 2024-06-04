import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setUsername('')
      setPassword('')

      setErrorMessage('wrong credentials')
      setType('fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handlePost = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const createdBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(createdBlog))

    } catch (error) {
      setErrorMessage('Error posting blog')
      setType('fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    setErrorMessage(`New blog, ${title} by ${author} added!`)
    setType('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
}

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <form onSubmit={handlePost}>
      <div>
        Title: 
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Post</button>
    </form>
  )

  const showBlogs = () => (
    <div>
      <h2>Blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} type={type} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button type='button' onClick={() => handleLogout()}>LogOut</button>
        {blogForm()}
        {showBlogs()}
      </div>
      } 
      
    </div>
  )
}

export default App