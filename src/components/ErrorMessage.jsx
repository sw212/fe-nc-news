export default function ErrorMessage({message})
{
    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <span className="text-4xl font-bold text-background_alt mb-4">
                    {message}
                </span>
            </div>
        </div>
    )
}