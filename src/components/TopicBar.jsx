import { API } from "../api";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function TopicBar()
{
    let [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try
            {
                const response = await API.get("/topics");
                setTopics(response.data.topics);
            }
            catch (err)
            {
            }
        }

        fetchTopics();
    }, []);

    const NavLink = ({to, text}) => {
        return (
            <Link to={to}>
                <div className="py-4">
                    <span>{text}</span>
                </div>
            </Link>
        )
    }

    return (
        <div className="flex overflow-x-auto border-background_alt border-solid border-y-2 my-4 ">
            <nav className="mx-auto">
                <ul className="flex gap-x-6">
                    {topics.map((t) => {
                        const selected = t.slug === topic;
                        return (
                            <li key={t.slug} className={`${selected && "shadow-[0_-3px_0_0_inset_#a98342] text-[#a98342]"}`} >
                                {< NavLink to={`/articles?topic=${t.slug}`} text={t.slug} />}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    )
}