export default function Button(props)
{
    const { onClick, children } = props;

    return (
        <button
            className="p-2 border-solid border-background_alt border-2 rounded-lg hover:bg-background_alt"
            onClick={onClick}
        >
            {children}
        </button>
    )
}