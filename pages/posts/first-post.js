import Link from "next/link";
import Head from "next/head";
import Button from '@mui/material/Button';
import Sidebar from '../../components/sidebar';

const FirstPost = () => {
    return (
        <>
            <Head>
                <title>
                    First Post
                </title>
            </Head>
            <Sidebar/>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
                
            </h2>
            <Button variant="contained">Hello World</Button>
        </>
    )
}

export default FirstPost;