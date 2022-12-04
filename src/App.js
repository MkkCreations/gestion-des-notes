import './App.css';
import Login from './Components/Login';
import Home from './Components/Home'
import {Routes, Route}  from 'react-router-dom';
import Register from './Components/Register';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './Components/ProtectedRoute';


function App() {
  return (
    <div>
      <nav><h1>Gestion des Notes</h1></nav>
      <AuthProvider>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
