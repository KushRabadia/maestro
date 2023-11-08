import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Layout from '../src/layout/layout';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Course {
  imageUrl: string;
  title: string;
  author: string;
  playlistId: string;
  description: string;
  featured?: boolean;
}

interface TitlebarImageListProps {
  data: Course[];
  listIndex: number;
  length: number;
  setNext(index: number): void;
}

const TitlebarImageList: React.FC<TitlebarImageListProps> = ({ data, listIndex, length, setNext }) => {
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // Reset transition direction after the transition ends
    const transitionEndHandler = () => setTransitionDirection(null);
    const imageList = document.querySelector('.home_imageList') as HTMLElement;
    imageList.addEventListener('transitionend', transitionEndHandler);

    return () => {
      imageList.removeEventListener('transitionend', transitionEndHandler);
    };
  }, [transitionDirection]);

  const handleSetNext = (direction: 'left' | 'right') => {
    setTransitionDirection(direction);
    setNext(direction === 'left' ? listIndex - 1 : listIndex + 1);
  };
  return (
    <div 
      className={`imageListContainer ${transitionDirection} flexRowCenter`}
    >
      {listIndex>0 && <IconButton
        color="inherit"
        onClick={() => handleSetNext('left')}
        className={"imageList_leftIcon"}
      >
        <ArrowCircleLeftIcon fontSize='large'/>
      </IconButton>}
      <ImageList cols={6} gap={10} className={`home_imageList`}>
        {data.map((item) => (
          <ImageListItem key={item.imageUrl}>
            <img
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              alt={item.title}
              width={"248px"}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <Link href="/course" className='text-link'><ArrowForwardIcon /></Link>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {length > 0 && listIndex !== length-1 && <IconButton
        color="inherit"
        onClick={() => handleSetNext('right')}
        className={"imageList_rightIcon"}
      >
        <ArrowCircleRightIcon fontSize='large'/>
      </IconButton>}
    </div>
  );
};

const Home: React.FC = () => {
  const [currentlyVisible, setCurrentlyVisible] = React.useState<number>(0);
  const [courses, setCourses] = React.useState<Course[][]>([]);

  function chunkArray<Course>(array: Course[], chunkSize: number): Course[][] {
    const result: Course[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/course/courses")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const chunkedArray: Course[][] = chunkArray(data.courses, 6);
        setCourses(chunkedArray);
      });
  }, []);

  return (
    <Layout>
      <div className="margin-md">
        {courses.map((listData, index) => (
          index===currentlyVisible && <TitlebarImageList 
            key={index} 
            data={listData} 
            listIndex={index}
            length={courses.length}
            setNext={setCurrentlyVisible}
          />
        ))}

      </div>
    </Layout>
  );
};

export default Home;
