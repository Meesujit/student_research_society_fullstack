import { BrowserRouter as Router, Route, Routes } 
from 'react-router-dom'

import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard//AdminDashboard';
import Home from './pages/starterpage/Home';
import Navbar from './components/Navbar/Navbar'
import { useSelector } from 'react-redux';
import ResearchPage from './pages/researchpage/ResearchPage';
import EventPage from './pages/eventpage/EventPage';
import Contact from './pages/contact/Contact';

 const  App = () => {
  const {token} = useSelector((state) => state.auth);
  return (
    <Router>
        {token && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path='/events' element={<EventPage />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
