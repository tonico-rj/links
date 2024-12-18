import { createBrowserRouter } from "react-router-dom"


import { Home } from "./pages/home"  
import { Login } from "./pages/login"
import { Admin } from "./pages/admin"
import { Networks } from "./pages/networks"
import { Private } from "./components/Private"
import { ErrorPage } from "./pages/error" 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Private> <Home /> </Private>
  },
  {
    path: "/home",
    element: <Private> <Home /> </Private>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <Private> <Admin /> </Private>
  },
  {
    path: "/networks",
    element: <Private> <Networks /> </Private>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

export { router }
