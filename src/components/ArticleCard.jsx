import { Link } from "react-router-dom";

export default function ArticleCard(props)
{
    const { article } = props;
    const { article_id, title, topic, article_img_url, comment_count } = article;

    return (
        <div className="flex flex-row px-2">
            <Link to={`/articles/${article_id}`} className="flex justify-center basis-1/4 shrink-0">
                <img className="object-cover aspect-square my-auto w-full" src={article_img_url} />
            </Link>

            <div className="basis-3/4 shrink-0 flex flex-col justify-between max-2xl px-2 sm:px-4">
                <Link to={`/articles/${article_id}`}>
                    <h2 className="texl-lg sm:text-2xl">
                        {title}
                    </h2>
                </Link>

                <p className="flex flex-col sm:flex-row justify-between whitespace-nowrap text-background_alt text-xs">
                    <Link to={`/articles?topic=${topic}`}>
                        <span>{topic}</span>
                    </Link>

                    <Link to={`/articles/${article_id}#comments`}>
                        <span>{comment_count} comments</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}