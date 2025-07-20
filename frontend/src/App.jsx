// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserList from './pages/UserList';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
