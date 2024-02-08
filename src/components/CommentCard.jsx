export default function CommentCard(props)
{
    const { comment } = props;
    const { author, created_at, votes, body } = comment;

    const date = new Date(created_at);

    return (
        <div className="flex flex-col relative">
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
            </div>
        </div>
    );
}