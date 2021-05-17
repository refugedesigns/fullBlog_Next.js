import { Fragment } from "react"
import AllPosts from "../../components/posts/all-posts"
import Head from 'next/head'
import { getAllPosts } from "../../lib/posts-util"



const AllPostsPage = (props) => {
    return (
      <Fragment>
        <Head>
          <title>All Posts</title>
          <meta name="description" content="List of all programming tutorials and posts" />
        </Head>
        <AllPosts posts={props.allPosts} />
      </Fragment>
    )
}

export function getStaticProps() {

  const allPosts = getAllPosts()

  return {
    props: {
      allPosts: allPosts
    },
    revalidate: 600
  }
}

export default AllPostsPage