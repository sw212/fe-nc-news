export function ErrorMessageFromStatus(code)
{

    switch (Number(code))
    {
        case 404: return "Sorry, we can't find the page you are looking for."
        // case 400: return "Oops! Something went wrong."

        default: return "Oops! Something went wrong."
    }
}