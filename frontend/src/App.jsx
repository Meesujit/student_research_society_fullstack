import { BrowserRouter as Router, Route, Routes } 
from 'react-router-dom'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard//AdminDashboard';
import ResearchForm from './components/Research/ResearchForm';
import ResearchList from './components/Research/ResarchList';
import EventList from './components/Event/EventList';
import EventJoin from './components/Event/EventJoin';
 const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-research" element={<ResearchForm />} />
        <Route path="/research-list" element={<ResearchList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/join-event/:id" element={<EventJoin />} />
      </Routes>
    </Router>
  );
}

export default App;
