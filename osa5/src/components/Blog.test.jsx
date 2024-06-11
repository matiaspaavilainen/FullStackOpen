import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('Renders title', () => {
	const blog = {
		title: 'How to do test',
		author: 'kalle',
		url: 'google.com'
	}

	render(<Blog blog={blog} />)

	const title = screen.getByText('How to do test', {exact: false})
	const url = screen.queryByText('google.com')
	expect(title).toBeDefined()
	expect(url).toBeNull()
})

describe('After expanding the details:', async () => {

	beforeEach(async () => {
		const userForBlog = {
			username: 'test1175',
			name: 'Tester McTest',
			id: '9050'
		}

		const blog = {
			title: 'How to do test',
			author: 'kalle',
			url: 'google.com',
			likes: 5,
			user: userForBlog
		}

		const mockHandler = vi.fn()

		render(
			<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} user={userForBlog} />
		)

		const user = userEvent.setup()
		const button = screen.getByText('Details', { exact: false })
		await user.click(button)
	})

	test('Url is rendered', () => {
		const element = screen.getByText('google.com', { exact: false })
		expect(element).toBeDefined()
	})

	test('Likes are rendered', () => {
		const element = screen.getByText('5', { exact: false })
		expect(element).toBeDefined()
	})

	test('User is rendered', () => {
		const element = screen.getByText('Tester McTest', { exact: false })
		expect(element).toBeDefined()
	})
})

test('Clicking like 2 times calls the handler 2 times', async () => {
	const userForBlog = {
		username: 'test',
		name: 'Tester',
		id: '9050'
	}

	const blog = {
		title: 'How to do test',
		author: 'kalle',
		url: 'google.com',
		likes: 5,
		user: userForBlog
	}

	const mockHandler = vi.fn()

	render(
		<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} user={userForBlog} />
	)

	const user = userEvent.setup()
	const buttonDetails = screen.getByText('Details', { exact: false })
	await user.click(buttonDetails)

	const buttonLike = screen.getByText('Like')
	await user.dblClick(buttonLike)

	expect(mockHandler.mock.calls).toHaveLength(2)
})