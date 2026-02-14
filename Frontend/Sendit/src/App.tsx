import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
        <AdminRoutes />
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
