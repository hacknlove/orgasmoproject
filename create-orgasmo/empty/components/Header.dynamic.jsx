export default function Header({ text, link, href }) {
    return (
        <div>
            <h1 className="title">{text} <a href={href}>{link}</a></h1>
        </div>
    )
}