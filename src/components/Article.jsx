import { API } from "../api";
import { ErrorMessageFromStatus } from "../utils";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ErrorMessage from "./ErrorMessage";
import Comments from "./Comments";
import Loading from "./Loading";
import Button from "./Button";

export default function Article()
{
    const { id } = useParams();
    

    const [article, setArticle] = useState({});
    const [userVote, setUserVote] = useState(0);

    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState(null);
    const isError = !!error;

    const date = new Date(article.created_at);

    useEffect(() => {
        const fetchArticle = async () => {
            try
            {
                const response = await API.get(`/articles/${id}`);
                setArticle(response.data.article);
                setError(null);
            }
            catch(err)
            {
                setError(ErrorMessageFromStatus(err.response.status));
            }

            setHasLoaded(true);
        }

        fetchArticle();
    }, []);

    const voteHandler = (change) => async () => {
        const currentVotes = Number(article.votes);
        const currentUserVote = userVote;

        if (userVote == change)
        {
            change = -change;
        }
        else if (userVote)
        {
            change *= 2;
        }
        setUserVote(userVote + change);


        setArticle((article) => {
            return {
                ...article,
                votes: currentVotes + change,
            }
        });

        try
        {
            const response = await API.patch(`/articles/${id}`, {inc_votes: change});
        }
        catch(err)
        {
            setUserVote(currentUserVote);

            setArticle((article) => {
                return {
                    ...article,
                    votes: currentVotes,
                }
            });
        }
    }
    
    if (isError)
    {
        return <ErrorMessage message={error} />
    }

    if (!hasLoaded)
    {
        return <Loading />
    }

    return (
        <>
            <main>
                <article className="p-4">
                    <header className="py-4">
                        <h2 className="text-3xl">{article.title}</h2>
                        
                        <div className="flex flex-col sm:flex-row justify-between whitespace-nowrap space-y-2">
                            <div className="flex overflow-auto">
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

                            <div className="flex relative space-x-2">
                                <p>
                                    {article.votes} votes
                                </p>
                                
                                <div className="flex gap-2">
                                    <div className="sm:absolute bottom-[60%]">
                                        <button
                                            className={`p-2 border-solid border-background_alt border-2 rounded-lg ${userVote===1 && "bg-background_alt"}`}
                                            onClick={voteHandler(1)}
                                        >
                                            <svg viewBox="0 0 100 100" stroke="white" strokeWidth="4" className="w-3 h-3" xmlns="http://www.w3.org/2000/svg">
                                                <title>Upvote Arrow</title>
                                                <line x1="10" y1="90" x2="50" y2="10" />
                                                <line x1="50" y1="10" x2="90" y2="90" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="sm:absolute top-[60%]">
                                        <button
                                            className={`p-2 border-solid border-background_alt border-2 rounded-lg ${userVote===-1 && "bg-background_alt"}`}
                                            onClick={voteHandler(-1)}
                                        >
                                            <svg viewBox="0 0 100 100" stroke="white" strokeWidth="4" className="w-3 h-3" xmlns="http://www.w3.org/2000/svg">
                                                <title>Downvote Arrow</title>
                                                <line x1="10" y1="10" x2="50" y2="90" />
                                                <line x1="50" y1="90" x2="90" y2="10" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
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