import { Link } from "react-router-dom";

export default function ArticleCard(props)
{
    const { article } = props;
    const { article_id, title, topic, article_img_url, comment_count } = article;

    return (
        <div className="flex flex-row">
            <img className="object-cover aspect-square h-60" src={article_img_url} />

            <div className="flex flex-col justify-between grow max-2xl p-2">
                <Link to={`/articles/${article_id}`}>
                    <h2>{title}</h2>
                </Link>

                <p className="flex justify-between"> 
                    <span>{topic}</span>
                    <span>{comment_count} comments</span>
                </p>
            </div>
        </div>
    )
}