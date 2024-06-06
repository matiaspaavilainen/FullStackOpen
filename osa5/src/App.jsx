import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : ''}
    const showWhenVisible = { display: blogFormVisible ? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handlePost={handlePost}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            setBlogFormVisible={setBlogFormVisible}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

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
      {!user && <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />}
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