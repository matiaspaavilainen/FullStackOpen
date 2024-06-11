import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
	// control blog view style
	const [expanded, setExpanded] = useState(false)
	const [buttonText, setButtonText] = useState('Details')

	const blogStyle = {
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 4,
		border: 'solid',
		borderColor: 'purple',
		borderWidth: 1,
		borderRadius: 6,
		marginBottom: 4,
	}

	const handleExpand = () => {
		setExpanded(!expanded)
		setButtonText(expanded ? 'Details' : 'Hide')
	}

	const handleLike = (event) => {
		event.preventDefault()
		blog.likes += 1
		blog.user = blog.user.id
		addLike(blog, blog.id)
	}

	const handleDelete = (event) => {
		event.preventDefault()
		deleteBlog(blog)
	}

	if (expanded) {
		return (
			<div style={blogStyle}>
				<div>
					{blog.title} | {blog.author} | <button type="button" onClick={handleExpand}>{buttonText}</button>
					<br></br>
					{blog.url}
					<br></br>
					{blog.likes} | <button onClick={handleLike}>Like</button>
					<br></br>
					{blog.user.name}
					<br></br>
					{(user.id === blog.user.id) && <button type="button" onClick={handleDelete}>Delete</button>}
				</div>
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} | {blog.author} | <button type="button" onClick={handleExpand}>{buttonText}</button>
			</div>
		</div>
	)
}

export default Blog