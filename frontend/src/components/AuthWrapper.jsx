import React from "react"

const AuthWrapper = (props) => {
  return (
    <div className="h-screen flex flex-row justify-between">
      <img
        src="https://images.unsplash.com/photo-1578852612716-854e527abf2e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="login_banner"
        className="object-cover flex-1 h-full hidden lg:flex"
      />
      <div className="w-full lg:w-1/2 xl:w-1/3">{props.children}</div>
    </div>
  )
}

export default AuthWrapper
