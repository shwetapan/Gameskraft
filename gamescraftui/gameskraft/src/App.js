import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Login/Login';
import RegistrationPage from './Components/Registration/Registration';
import Events from './Components/Events/Events';
import Home from './Components/Home/Home';
import NewsFeed from './Components/News/NewsFeed';
import ForgotPassword from './Components/Login/ForgotPassword';
import UserLogin from './Components/User/User';
import UserProfileCard from './Components/User/UserProfileCard';

function App() {
  return (
    <div className="App"> 
    
      <Router>
      <Routes>
        <Route exact path="/" element={<RegistrationPage/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/UserProfileCard" element={<UserProfileCard />} />
      </Routes>
    </Router>
       
    </div>
  );
}

export default App;
