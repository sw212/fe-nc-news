import { API } from "../api";

import { useState, useEffect } from "react";

import ArticleCard from "./ArticleCard";

export default function Home()
{
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try
            {
                const response = await API.get("/articles?limit=1");
                setArticle(response.data.articles[0]);
            }
            catch(err)
            {
                setError(null);
            }
        }
        fetchArticle();
    }, []);

    return (
        <>
            {article &&
            <>
                <h1 className="py-4 px-2 text-3xl">Featured Article:</h1>
                <ArticleCard article={article}/>
            </>
            }
        </>
    )
}