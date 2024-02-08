import { API } from "../api";
import { ErrorMessageFromStatus } from "../utils";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

export default function Articles()
{
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState(null);
    const isError = !!error;

    const topic   = searchParams.get("topic");
    const order   = searchParams.get("order") ?? "desc";
    const sort_by = searchParams.get("sort_by") ?? "created_at";
    
    const sort_options = [
        {display: "date",     value: "created_at"},
        {display: "comments", value: "comment_count"},
        {display: "votes",    value: "votes"},
    ]

    useEffect(() => {
        const fetchArticles = async () => {
            try
            {
                let URL = "/articles?";
                if (topic)   { URL += `topic=${topic}`;      }
                if (order)   { URL += `&order=${order}`;     }
                if (sort_by) { URL += `&sort_by=${sort_by}`; }

                const response = await API.get(URL);
                setArticles(response.data.articles);
                setError(null);
            }
            catch(err)
            {
                setError(ErrorMessageFromStatus(err.response.status));
            }

            setHasLoaded(true);
        }

        fetchArticles();
    }, [topic, sort_by, order]);

    const handleSortOrderChange = (event) => {
        setSearchParams((params) => {
            params.set('order', event.target.value);
            return params
        });
    }

    const handleSortKeyChange = (event) => {
        setSearchParams((params) => {
            params.set('sort_by', event.target.value);
            return params
        });
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
        <main>
            <div className="flex p-2 gap-x-8 overflow-x-auto">
                <div>
                    <label htmlFor="sort_key" className="mr-2">
                        Sort By:
                    </label>

                    <select id="sort_key" value={sort_by} onChange={handleSortKeyChange} className="bg-background border-solid border-background_alt border-2 rounded-md">
                        {sort_options.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.display}
                                </option>
                            );
                        })}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="sort_order" className="mr-2">
                        Order:
                    </label>

                    <select id="sort_order" value={order} onChange={handleSortOrderChange} className="bg-background border-solid border-background_alt border-2 rounded-md">
                        <option value="desc">descending</option>
                        <option value="asc" >ascending </option>
                    </select>
                </div>
            </div>
            
            <section className="py-2">
                <ul className="flex flex-col gap-y-5">
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