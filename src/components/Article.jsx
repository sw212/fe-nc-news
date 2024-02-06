import { API } from "../api";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import Comments from "./Comments";
import Loading from "./Loading";

export default function Article()
{
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const hasLoaded = !!article.body;

    const date = new Date(article.created_at);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await API.get(`/articles/${id}`);

            setArticle(response.data.article);
        }

        fetchArticles();
    }, []);

    return (
        <>
            <main>
                {!hasLoaded && <Loading />}

                <article className="p-4">
                    <header className="py-4">
                        <h2 className="text-3xl">{article.title}</h2>
                        
                        <div className="flex flex-col sm:flex-row justify-between whitespace-nowrap overflow-auto">
                            <div className="flex">
                                <p>
                                    <span>By {article.author}</span>
                                </p>
                                <p>
                                    {
                                        !isNaN(date) &&
                                        <>
                                            <span className="px-2">-</span>
                                            <time dateTime={date.toISOString()}>
                                                {date.toLocaleDateString()}
                                            </time>
                                        </>
                                    }
                                </p>
                            </div>

                            <div>
                                {article.votes} votes
                            </div>
                        </div>
                    </header>
                    
                    <div className="">
                        <img className="object-contain" src={article.article_img_url} />
                    </div>

                    <section className="py-4">
                        {article.body}
                    </section>
                </article>
            </main>
            
            <Comments article_id={id}/>
        </>
    )
}