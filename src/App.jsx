import './App.css';
import TeamMenu from './components/TeamMenu/TeamMenu';
import TeamStats from './components/TeamStats/TeamStats';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {path: '/', element: <TeamMenu/>},
    {path: '/team/:id', element: <TeamStats/>}
  ],
);


function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
