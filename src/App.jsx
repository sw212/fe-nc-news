import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'
import TopicBar from './components/TopicBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Articles from './components/Articles'
import Article from './components/Article'

import './App.css'

function App() {

    return (
        <div className="max-w-5xl mx-auto p-2">
            <NavBar />
            <TopicBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<Article />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
