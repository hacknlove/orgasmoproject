import Image from "next/image";

export default function Footer ({ text, href, logo }) {
    return (
        <div style={{ width: '100%' }}>
          <a
          className="footerContent"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}{' '}
          <span className="logo">
            <Image {...logo} />
          </span>
        </a>
        </div>
    )
}