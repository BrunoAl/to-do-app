import React from 'react'
import Login from '../components/Login'
import { renderWithRouter, fireEvent, cleanup } from '../test-utils'

afterEach(cleanup)

test('calls onSubmit with the username and password when submitted', () => {
  const fakeUser = { email: 'tester@gmail.com', password: '123123' }
  const onSubmitPromise = jest.fn()
  const onSubmit = jest.fn().mockImplementation((email, password) => {
    onSubmitPromise(email, password)
    return Promise.resolve()
  })
  const { getByTestId, getByLabelText } = renderWithRouter(
    <Login title="Sign In" redirectText="Sign up instead" onSubmit={onSubmit} />
  )
  const emailNode = getByLabelText(/email/i)
  const passwordNode = getByLabelText(/password/i)

  emailNode.value = fakeUser.email
  passwordNode.value = fakeUser.password

  fireEvent.click(getByTestId('submitButton'))
  expect(onSubmit).toHaveBeenCalled()
  expect(onSubmitPromise).toHaveBeenCalledWith(fakeUser.email, fakeUser.password)
})
