import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Page/Login';
import Register from './Page/Register';
import DashboardPage from './Page/Dashboard/DashboardPage';
import NewProject from './Page/Dashboard/NewProject';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/project/new' element={<NewProject />} />
      </Routes>
    </Router>
  );
}

export default App;
