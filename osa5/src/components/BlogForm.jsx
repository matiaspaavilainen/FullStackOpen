import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    createBlog,
    setBlogFormVisible
}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
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
            <button type='submit' onClick={() => setBlogFormVisible(false)}>Post</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    setBlogFormVisible: PropTypes.func.isRequired
}

export default BlogForm