import ReactMarkdown from "react-markdown";
import { render } from 'react-dom'
import Image from "next/image";
import { Prism as SynthaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

const PostContent = (props) => {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;


  
  
  const customeRenderers = {
    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>
    },

    code({language,value, className, children}) {
     
      language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        <SynthaxHighlighter
          style={atomDark}
          language={language}
          children={value}
          children={children}
        />
      );
    },
  };

  

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customeRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
