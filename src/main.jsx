import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditForm from './pages/EditForm.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "/login",
        element : (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path : "/signin",
        element : (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path : "/all-posts",
        element : (
          <AuthLayout authentication={true}>
            {" "}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path : '/edit-post/:slug',
        element : (
          <AuthLayout authentication={true}>
            {" "}
            <EditForm />
          </AuthLayout>
        )
      },
      {
        path : "/add-post",
        element : (
          <AuthLayout authentication={true}>
            {" "}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path : "/post/:slug",
        element : (
            <Post />
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}  />
    </Provider>
  </StrictMode>,
)
