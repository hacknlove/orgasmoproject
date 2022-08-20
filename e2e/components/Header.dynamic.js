import Head from 'next/head';
export default function Header({text = 'Header'}) {
    return <>
        <Head>
            <title>{text}</title>
        </Head>
        <h1 className="Header">{text}</h1>
    </>
}