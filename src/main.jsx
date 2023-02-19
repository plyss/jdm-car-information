import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './Layout'
import Home from './Home'
import About from './About'
import Collections from './Collections'
import Admin from './Admin'
import MyCar from './MyCar'
import CarDetails from './CarDetails'
import CarProvider from './CarProvider'
import SearchProvider from './SearchProvider'
import ThemeProvider from './ThemeProvider'
import { Provider } from 'react-redux'

import store from './store'
import Protected from './Protected'


const router = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'collections', element: <Collections /> },
      { path: 'admin', element: <Admin /> },
      { path: 'collections/:carId', element: <CarDetails /> }
    ]
  },
  {
    path: '/MyCar', element: <Protected />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <CarProvider>
      <SearchProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </SearchProvider>
    </CarProvider>
  </ThemeProvider>
)
