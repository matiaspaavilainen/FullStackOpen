const BlogForm = ({
    title,
    author,
    url,
    handlePost,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    setBlogFormVisible
    }) => {
    return (
        <form onSubmit={handlePost}>
            <div>
                Title:
                <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                Author:
                <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                Url:
                <input
                    type='text'
                    value={url}
                    name='Url'
                    onChange={handleUrlChange}
                />
            </div>
            <button type='submit' onClick={() => setBlogFormVisible(false)}>Post</button>
        </form>
    )
}

export default BlogForm