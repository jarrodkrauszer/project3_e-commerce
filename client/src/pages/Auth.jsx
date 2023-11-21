import { NavLink, useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { UPDATE_USER } from '../utils/actions';
import { REGISTER, LOGIN } from '../utils/mutations';
import React from 'react'
import { useState } from 'react'

import { useStoreContext } from '../utils/store'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

function Auth({ isLogin }) {
  const [, dispatch] = useStoreContext();
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')


  const [authenticateUser] = useMutation(isLogin ? LOGIN : REGISTER, {
    variables: formData
  })

  const handleInputChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resolverName = isLogin ? 'login' : 'register'

      const { data: userData } = await authenticateUser()

      setFormData({ ...initialFormData })

      dispatch({
        type: UPDATE_USER,
        user: userData[resolverName]
      })

      setErrorMessage('')
      navigate('/')

    } catch (err) {
      console.log(err.message)
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
          <img
            style={{ filter: 'invert(1)' }}
            className="mx-auto h-10 w-auto invert-colors"
            src={'/images/logo.png'}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Register'}
          </h2>
          {errorMessage && <p className="text-red-500 text-center mt-1">{errorMessage}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            {!isLogin ? (
              <>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      onChange={handleInputChange}
                      name="firstName"
                      value={formData.firstName}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      onChange={handleInputChange}
                      name="lastName"
                      value={formData.lastName}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={handleInputChange}
                  name="email"
                  value={formData.email}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handleInputChange}
                  name="password"
                  value={formData.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
