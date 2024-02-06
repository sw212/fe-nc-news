import { API } from "../api";

import { useState, useEffect } from "react";

import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

export default function Articles()
{
    const [articles, setArticles] = useState([]);
    const hasLoaded = !!articles.length;

    useEffect(() => {
        const fetchArticles = async () => {
            try
            {
                const response = await API.get("/articles");
                setArticles(response.data.articles);
            }
            catch(err)
            {
                console.log(err);
                setArticles([]);
            }
        }

        fetchArticles();
    }, []);

    return (
        <main>
            {!hasLoaded && <Loading />}
            
            <section>
                <ul className="space-y-8">
                    {articles.map((article) => {
                        return (
                            <li key={article.article_id}>
                                <ArticleCard article={article}/>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}