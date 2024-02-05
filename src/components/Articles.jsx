import { useState, useEffect } from "react";
import axios from "axios";

import ArticleCard from "./ArticleCard";

export default function Articles()
{
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get("https://nc-news-egcd.onrender.com/api/articles");

            setArticles(response.data.articles);
        }

        fetchArticles();
    }, []);

    return (
        <main>
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