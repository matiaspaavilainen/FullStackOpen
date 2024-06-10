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

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(createdBlog))

    } catch (error) {
      setErrorMessage('Error posting blog')
      setType('fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }

    setErrorMessage(`New blog, ${newBlog.title} by ${newBlog.author} added!`)
    setType('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const addLike = async (blogObject, idToUpdate) => {
    await blogService.updateBlog(blogObject, idToUpdate)
    setBlogs(await blogService.getAll())
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Do you want to delete blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      await blogService.deleteBlog(blogToDelete.id)
      setBlogs(await blogService.getAll())
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createBlog={createBlog}
            setBlogFormVisible={setBlogFormVisible}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>Blogs</h2>
        {
          blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          )
        }
      </div>
    )
  }

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