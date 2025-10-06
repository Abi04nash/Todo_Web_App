import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register"
import ProtectedRoutes from './pages/ProtectedRoutes'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Home /></ProtectedRoutes>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App