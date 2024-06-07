import React from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"/jobs/:id",
          element:<Jobs/>
        }
      ]

    }
  ])

  return <RouterProvider router={routes} />;
}

export default App;
