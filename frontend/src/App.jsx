import { Route, Routes } from "react-router"
import { Home, Login, Signup, Profile } from "./screens"
import ProtectedRoute from "./components/ProtectedRoute"
import MainLayout from "./components/MainLayout"

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
