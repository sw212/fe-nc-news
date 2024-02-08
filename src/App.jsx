import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

import ErrorMessage from './components/ErrorMessage';
import NavBar from './components/NavBar'
import TopicBar from './components/TopicBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Articles from './components/Articles'
import Article from './components/Article'

import './App.css'

function App()
{
    const NotFound = () => {
        return <ErrorMessage message={"404: Not found"} />
    }

    const Layout = () => {
        return (
            <>
                <div className="max-w-5xl mx-auto p-2">
                    <NavBar />
                    <TopicBar />
                    <Outlet />
                    <Footer />
                </div>
            </>
        );
    }

    const router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { path:"/"             , element: <Home />     },
                { path: "/articles"    , element: <Articles /> },
                { path: "/articles/:id", element: <Article />  },
                { path: "*", element: <NotFound />  },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App
