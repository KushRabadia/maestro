import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "@mui/material/Link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/layout/layout";

interface Item {
  img: string;
  title: string;
  author: string;
  rows?: number;
  cols?: number;
  featured?: boolean;
}

interface TitlebarImageListProps {
  data: Item[];
}

const TitlebarImageList: React.FC<TitlebarImageListProps> = ({ data }) => {
  return (
    <div className="imageListContainer flexRowCenter">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        containerClass="container"
        draggable
        focusOnSelect={false}
        infinite={false}
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 64,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {data.map((item, index) => (
          <div key={index}>
            <ImageListItem className="margin-sm">
              <img
                src={`${item.img}?fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                className="card"
                style={{ width: "100%", height: "217px" }}
              />

              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <Link href="/course" className="text-link">
                      <ArrowForwardIcon />
                    </Link>
                  </IconButton>
                }
              />
            </ImageListItem>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const itemData = [
  {
    img: "https://itsg-global.com/wp-content/uploads/2016/09/react-js-to-use-or-not-to-use.png",
    title: "React JS",
    author: "Beginner Level",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032016/untitled-1_308.png?itok=zKSyD0i9",
    title: "Angular JS",
    author: "Intermediate Level",
  },
  {
    img: "https://colorlib.com/wp/wp-content/uploads/sites/2/node.js-logo.png",
    title: "Node Js",
    author: "Beginner Level",
  },
  {
    img: "https://i.pinimg.com/originals/d4/74/7c/d4747cb7dcbecb5223b83355ea97a3be.png",
    title: "AWS",
    author: "Expert Level",
    cols: 2,
  },
  {
    img: "https://wallpapercave.com/wp/wp8042506.jpg",
    title: "Python",
    author: "Beginner Level",
    cols: 2,
  },
  {
    img: "https://miro.medium.com/v2/resize:fit:1400/1*JKGCmCLDI4wrIJXHUhEACg.png",
    title: "Docker",
    author: "Expert Level",
    rows: 2,
    cols: 2,
    featured: true,
  },
];
const itemDataTwo = [
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="margin-md">
        <TitlebarImageList data={[...itemData, ...itemDataTwo]} />
      </div>
    </Layout>
  );
};

export default Home;
