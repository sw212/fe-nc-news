export default function Button(props)
{
    const { onClick, children } = props;

    return (
        <button className="p-2 border-solid border-background_alt border-2 rounded-lg" onClick={onClick}>
            {children}
        </button>
    )
}