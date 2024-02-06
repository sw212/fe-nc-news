import { API } from "../api";

import CommentCard from "./CommentCard";
import Button from "./Button";

export default function Comments(props)
{
    const { article_id } = props;

    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    
    const commentsCount = comments.length;

    useEffect(() => {
        const fetchComments = async () =>
        {
            try
            {
                const response = await API.get(`/articles/${article_id}/comments`);
                setComments(response.data.comments);
            }
            catch(err)
            {
                console.log(err);
                setComments([]);
            }
        }

        fetchComments();
    }, [])

    return (
        <div className="border-solid border-t-2">
            <p className="text-3xl p-2">
                    {commentsCount} comments
            </p>
            <ul>
                {
                    showAllComments ?
                    (
                        <>
                            {
                                comments.map((comment) => {
                                    return (
                                        <li key={comment.comment_id}>
                                            <CommentCard comment={comment} />
                                        </li>
                                    );
                                })
                            }
                            <Button onClick={() => setShowAllComments(false)}>Show Fewer Comments</Button>
                        </>
                    )
                    :
                    (
                        <>
                            {
                                comments.slice(0,2).map((comment) => {
                                    return (
                                        <li key={comment.comment_id}>
                                            <CommentCard comment={comment} />
                                        </li>
                                    );
                                })
                            }
                            {
                                (commentsCount > 2) && (
                                    <Button onClick={() => setShowAllComments(true)}>Show More Comments</Button>
                                )
                            }
                        </>
                    )
                }
            </ul>
        </div>
    )

}