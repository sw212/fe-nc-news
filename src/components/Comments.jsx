import { API } from "../api";

import { useEffect, useState, useContext } from "react";

import { UserContext } from "../contexts/UserContext";
import CommentCard from "./CommentCard";
import Button from "./Button";

export default function Comments(props)
{
    const { article_id } = props;

    const { user } = useContext(UserContext);
    const loggedIn = user !== '';

    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    
    const [userComment, setUserComment] = useState('');
    const [submitCommentError, setsubmitCommentError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [refreshComments, setRefreshComments] = useState(0);
    
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
    }, [user, refreshComments]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = user;
        const body = userComment;

        submitComment(username, body);
    }

    const submitComment = async (username, body) => {
        setDisableSubmit(true);

        try
        {
            const response = await API.post(`articles/${article_id}/comments`, {username, body});
            setUserComment('');
            setsubmitCommentError(false);
            setRefreshComments(1-refreshComments);
            setDisableSubmit(false);
            
            return true;
        }
        catch(err)
        {
            console.log(err);
            setsubmitCommentError(true);
            setDisableSubmit(false);

            return false;
        }
    }

    const handleInput = (event) => {
        setUserComment(event.target.value);
    };


    return (
        <div className="border-solid border-t-2">
            <p className="text-3xl p-2">
                    {commentsCount} comments
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col py-2">
                <textarea
                    value={userComment}
                    required
                    onChange={handleInput}
                    placeholder={loggedIn ? "Add your comment..." : "Please sign in to add a comment."}
                    disabled={!loggedIn}
                    className="w-full p-2 border rounded bg-background"
                />

                <div className="flex p-4">
                    {submitCommentError &&
                        <p className="text-red-500 font-semibold">
                            Failed to submit comment.
                        </p>
                    }

                    {loggedIn &&
                        <button type="submit" className="p-2 ml-auto rounded bg-background_alt disabled:pointer-events-none" disabled={disableSubmit}>
                            Add Comment
                        </button>
                    }
                </div>
            </form>

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