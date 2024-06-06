import React from 'react';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    { 
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "jobs/:id",
          element: <Jobs />
        }
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
