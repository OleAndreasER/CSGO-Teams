import './app.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from '../navbar/navbar';
import { Mainpage } from '../mainpage/mainpage';
import { Favorites } from '../favorites/favorites';

export function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Mainpage />}/>
          <Route path="/favorites" element={<Favorites />}/>
      </Routes>
    </Router>
  )
}