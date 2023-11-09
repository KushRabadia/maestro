import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "@mui/material/Link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export interface Course {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  playlistId: string;
  description: string;
  featured?: boolean;
}

interface CarouselComponentProps {
  data: Course[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ data }) => {
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
        {data.map((course, index) => (
          <div key={index}>
            <ImageListItem key={course._id} className="margin-sm">
              <img
                src={`${course.imageUrl}?fit=crop&auto=format`}
                alt={course.title}
                loading="lazy"
                className="card"
                width={400}
                height={200}
                style={{ width: "100%", height: "217px" }}
              />

              <ImageListItemBar
                title={course.title}
                subtitle={course.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${course.title}`}
                  >
                    <Link href={`/course/${course._id}`} className="text-link">
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

export default CarouselComponent;
