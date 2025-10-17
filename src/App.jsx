import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import All from './All';
import Upcoming from './Upcoming';
import Completed from './Completed';
import Defaulted from './Defaulted';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
         <Route path="/all" element={<All />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/defaulted" element={<Defaulted />} />
      </Routes>
    </Router>
  );
}

export default App;