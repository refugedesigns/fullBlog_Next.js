import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import Head from 'next/head'
import { getFeaturedPosts } from "../lib/posts-util";


const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Antwi's Blog</title>
        <meta name="description" content="I blog about latest programming frameworks and how to use them." />
      </Head>
      <Hero />;
      <FeaturedPosts posts={props.featuredPosts} />
    </Fragment>
  );
};

export function getStaticProps() {

  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      featuredPosts: featuredPosts
    },
    revalidate: 600
  }
}

export default HomePage;
