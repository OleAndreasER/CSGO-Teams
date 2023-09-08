import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar"
import Mainpage from './mainpage/Mainpage';
import Favorites from './favorites/Favorites';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/mainpage" element={<Mainpage />}/>
          <Route path="/favorites" element={<Favorites />}/>
      </Routes>
    </Router> 
  )
}

export default App
