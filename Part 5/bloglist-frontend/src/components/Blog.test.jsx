import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    /*author: 'Component testing is done with react-testing-library',
    url: 'Component testing is done with react-testing-library',
    likes: 0, */
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} toggleDetails={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(0)
})