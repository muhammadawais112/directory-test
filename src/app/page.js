
import Head from 'next/head';
import Home from './Home/page';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About page of our Next.js app" />
      </Head>
      <Home/>
    </>
  );
}
