import { API } from "../api";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

export default function Articles()
{
    let [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    const [articles, setArticles] = useState([]);
    const hasLoaded = !!articles.length;

    useEffect(() => {
        const fetchArticles = async () => {
            try
            {
                let URL = "/articles?";
                if (topic)
                {
                    URL += `topic=${topic}`;
                }

                const response = await API.get(URL);
                setArticles(response.data.articles);
            }
            catch(err)
            {
                console.log(err);
                setArticles([]);
            }
        }

        fetchArticles();
    }, [topic]);

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