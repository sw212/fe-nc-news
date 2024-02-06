import { API } from "../api";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function CommentCard(props)
{
    const { comment, handleUndo } = props;
    const { comment_id, author, created_at, votes, body } = comment;

    const { user } = useContext(UserContext);
    const [deleteError, setDeleteError] = useState(false);
    const [didDelete, setDidDelete] = useState(false);

    const date = new Date(created_at);

    const handleDelete = async () => {
        try
        {
            const response = await API.delete(`/comments/${comment_id}`);
            setDidDelete(true);
            setDeleteError(false);
        }
        catch(err)
        {
            console.log(err);
            setDeleteError(true);
        }
    }

    const handleClick = async () => {
        const result = await handleUndo(user, body);
        
        if (result)
        {
            setDidDelete(false);
        }
    }

    return (
        <div className="flex flex-col p-4 relative">
            {didDelete && 
                <div className="absolute flex flex-col items-center justify-center inset-0 bg-black bg-opacity-25 rounded-lg">
                    <p>Comment deleted.</p>
                    {handleUndo &&
                        <button onClick={handleClick} className="mt-4 p-2 bg-background_alt rounded-lg">
                            Undo
                        </button>
                    }
                </div>
            }
            <div className="border-solid border-l-2 px-2">
                <div className="flex flex-col sm:flex-row justify-between whitespace-nowrap overflow-auto">
                    <div className="flex space-x-8">
                        <div>{author}</div>
                        <div>
                            {!isNaN(date) &&
                                <time dateTime={date.toISOString()}>
                                    {date.toLocaleDateString()}
                                </time>
                            }
                        </div>
                    </div>

                    <div>
                        {votes} likes
                    </div>
                </div>

                <p className="py-4"> 
                    {body}
                </p>
                
                {(author === user) &&
                    <button onClick={handleDelete} className="p-1 border-red-500 border-solid rounded-lg border-2">
                        Delete Comment
                    </button>
                }
            </div>
        </div>
    );
}