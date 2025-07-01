import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../Features/auth/auth'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()))
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full transition duration-200"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
