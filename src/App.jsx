import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers'; 
import CustomerDetails from './pages/CustomerDetails';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
      { path: "/customers", element: <Customers /> }, // Customers page
      { path: "/customers/:id", element: <CustomerDetails /> }, // Customer details page
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
