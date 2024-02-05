import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'

import './App.css'

function App() {

    return (
        <div className="max-w-7xl mx-auto">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
            </Routes>
        </div>
    )
}

export default App
