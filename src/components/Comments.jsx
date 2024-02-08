import { API } from "../api";
import { ErrorMessageFromStatus } from "../utils";

import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';

import { UserContext } from "../contexts/UserContext";

import Loading from './Loading';
import CommentCard from "./CommentCard";
import Button from "./Button";

export default function Comments(props)
{
    const { article_id } = props;

    const { hash } = useLocation();

    const { user } = useContext(UserContext);
    const loggedIn = user !== '';

    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState(null);
    const isError = !!error;

    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [refreshComments, setRefreshComments] = useState(0);
    
    const [userComment, setUserComment] = useState('');
    const [submitCommentError, setsubmitCommentError] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    
    const [commentDeleted, setCommentDeleted] = useState([]);
    const [disableDelete, setDisableDelete] = useState([]);
    const [deleteError, setDeleteError] = useState([]);
    
    const [disableUndo, setDisableUndo] = useState([]);
    const [undoError, setUndoError] = useState([]);
    
    const commentsCount = comments.length;

    useEffect(() => {
        const fetchComments = async () =>
        {
            try
            {
                const response = await API.get(`/articles/${article_id}/comments`);
                setComments(response.data.comments);
                setHasLoaded(true);
            }
            catch(err)
            {
                setError(ErrorMessageFromStatus(err.response.status));
            }
        }

        fetchComments();
    }, [user, refreshComments]);

    useEffect(() => {
        if (hash)
        {
            const scrollElement = document.getElementById(hash.slice(1));

            if (scrollElement)
            {
                scrollElement.scrollIntoView({
                    behavior: "smooth",
                })
            }

        }
    }, [hash, hasLoaded])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = user;
        const body = userComment;

        setDisableSubmit(true);
        {
            const result = await submitComment(username, body);
            
            if (result)
            {
                setUserComment('');
                setsubmitCommentError(false);
            }
            else
            {
                setsubmitCommentError(true);
            }
        }
        setDisableSubmit(false);
    }

    const submitComment = async (username, body) => {
        try
        {
            const response = await API.post(`articles/${article_id}/comments`, {username, body});
            setRefreshComments(1-refreshComments);
            
            return true;
        }
        catch(err)
        {
            return false;
        }
    }

    const handleInput = (event) => {
        setUserComment(event.target.value);
    };

    const handleDelete = async (comment_id) => {
        setDisableDelete((arr) => {return [...arr, comment_id]; });

        try
        {
            const response = await API.delete(`/comments/${comment_id}`);

            setDeleteError((arr) => {return arr.filter((v) => v !== comment_id);});
            setDisableUndo((arr) => {return arr.filter((v) => v !== comment_id);});

            setCommentDeleted((arr) => {return [...arr, comment_id];});
        }
        catch(err)
        {
            setDeleteError((arr) => {return [...arr, comment_id]; });
            setDisableDelete((arr) => {return arr.filter((v) => v !== comment_id);});
        }


    }

    const handleUndo = async (comment, comment_id) => {
        setDisableUndo((arr) => {return [...arr, comment_id]; });
        const result = await submitComment(user, comment);

        if (result)
        {
            setCommentDeleted((arr) => {return arr.filter((v) => v !== comment_id)});
            setUndoError((arr) => {return arr.filter((v) => v !== comment_id);});
        }
        else
        {
            setUndoError((arr) => {return [...arr, comment_id]; });
        }

        setDisableUndo((arr) => {return arr.filter((v) => v !== comment_id);});
    }


    if (isError)
    {
        return <ErrorMessage message={error} />
    }

    if (!hasLoaded)
    {
        return <Loading />
    }

    
    const Comment = ({comment}) => {
        const showUndo = (disableDelete.includes(comment.comment_id) && commentDeleted.includes(comment.comment_id));

        return (
            <li className="py-3 relative">
                <CommentCard comment={comment} />

                {showUndo &&
                    <div className="absolute flex gap-1 flex-col items-center justify-start inset-0 bg-black bg-opacity-25 rounded-lg">
                            <p>Comment deleted.</p>

                            <button
                                className="p-2 border-background_alt border-solid border-2 rounded-lg hover:bg-background_alt disabled:bg-background_alt disabled:cursor-not-allowed disabled:opacity-20"
                                disabled={disableUndo.includes(comment.comment_id)}
                                onClick={() => handleUndo(comment.body, comment.comment_id)}
                            >
                                Undo
                            </button>
                            
                            {undoError.includes(comment.comment_id) &&
                                <p className="text-red-500 font-semibold">
                                    Failed to undo delete.
                                </p>
                            }
                    </div>
                }

                {(comment.author === user && !showUndo) &&
                    <div className="flex items-center">
                        {deleteError.includes(comment.comment_id) &&
                            <p className="text-red-500 font-semibold">
                                Failed to delete comment.
                            </p>
                        }

                        <button
                            className="p-1 ml-auto pointer-events-auto border-red-500 border-solid rounded-lg border-2 hover:bg-red-500 disabled:bg-red-500 disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleDelete(comment.comment_id)}
                            disabled={disableDelete.includes(comment.comment_id)}
                        >
                            Delete Comment
                        </button>
                    </div>
                }
            </li>
        );
    }

    return (
        <div id="comments" className="border-solid border-t-2">
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

                {(submitCommentError || loggedIn) &&
                    <div className="flex items-center p-4">
                        {submitCommentError &&
                            <p className="text-red-500 font-semibold">
                                Failed to submit comment.
                            </p>
                        }

                        {loggedIn &&
                            <button
                                className="p-2 ml-auto rounded bg-background_alt disabled:pointer-events-none disabled:opacity-20"
                                type="submit"
                                disabled={disableSubmit}
                            >
                                Add Comment
                            </button>
                        }
                    </div>
                }
            </form>

            <ul className="flex flex-col gap-y-4">
                {
                    showAllComments ?
                    (
                        <>
                            {
                                comments.map((comment) => <Comment comment={comment} key={comment.comment_id} />)
                            }
                            {
                                (commentsCount > 2) && (
                                    <div className="">
                                        <Button onClick={() => setShowAllComments(false)}>Show Fewer Comments</Button>
                                    </div>
                                )
                            }
                        </>
                    )
                    :
                    (
                        <>
                            {
                                comments.slice(0,2).map((comment) => <Comment comment={comment} key={comment.comment_id} />)
                            }
                            {
                                (commentsCount > 2) && (
                                    <div className="">
                                        <Button onClick={() => setShowAllComments(true)}>Show More Comments</Button>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </ul>
        </div>
    )

}