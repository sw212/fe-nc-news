import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function Article()
{
    const { id } = useParams();
    const [article, setArticle] = useState({});

    const date = new Date(article.created_at);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get(`https://nc-news-egcd.onrender.com/api/articles/${id}`);

            setArticle(response.data.article);
        }

        fetchArticles();
    }, []);

    return (
        <main>
            <article className="p-4">
                <header className="py-4">
                    <h2 className="text-3xl">{article.title}</h2>
                    
                    <div className="flex justify-between">
                        <div className="flex space-x-2">
                            <p>
                                By {article.author}
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
                        <div>{article.votes} votes</div>
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
    )
}