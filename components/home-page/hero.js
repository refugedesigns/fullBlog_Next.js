import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/erasmus.jpg"
          alt="An image of Antwi Erasmus"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Antwi</h1>
      <p>
        I am a Javascript developer specialized in Node.js, React, Next.js and
        MongoDB
      </p>
    </section>
  );
};

export default Hero;
