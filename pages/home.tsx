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
  listIndex: number;
  setNext(index: number): void;
}

const TitlebarImageList: React.FC<TitlebarImageListProps> = ({ data, listIndex, setNext }) => {
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
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
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
      {listsData.length > 0 && listIndex !== listsData.length-1 && <IconButton
        color="inherit"
        onClick={() => handleSetNext('right')}
        className={"imageList_rightIcon"}
      >
        <ArrowCircleRightIcon fontSize='large'/>
      </IconButton>}
    </div>
  );
};

const itemData = [
  {
    img: 'https://itsg-global.com/wp-content/uploads/2016/09/react-js-to-use-or-not-to-use.png',
    title: 'React JS',
    author: 'Beginner Level',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032016/untitled-1_308.png?itok=zKSyD0i9',
    title: 'Angular JS',
    author: 'Intermediate Level',
  },
  {
    img: 'https://colorlib.com/wp/wp-content/uploads/sites/2/node.js-logo.png',
    title: 'Node Js',
    author: 'Beginner Level',
  },
  {
    img: 'https://i.pinimg.com/originals/d4/74/7c/d4747cb7dcbecb5223b83355ea97a3be.png',
    title: 'AWS',
    author: 'Expert Level',
    cols: 2,
  },
  {
    img: 'https://wallpapercave.com/wp/wp8042506.jpg',
    title: 'Python',
    author: 'Beginner Level',
    cols: 2,
  },
  {
    img: 'https://miro.medium.com/v2/resize:fit:1400/1*JKGCmCLDI4wrIJXHUhEACg.png',
    title: 'Docker',
    author: 'Expert Level',
    rows: 2,
    cols: 2,
    featured: true,
  }
]
const itemDataTwo = [{
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

const listsData: Item[][] = [
  itemData,
  itemDataTwo,
];

const Home: React.FC = () => {
  const [currentlyVisible, setCurrentlyVisible] = React.useState<number>(0);

  return (
    <Layout>
      <div className="margin-md">
        {listsData.map((listData, index) => (
          index===currentlyVisible && <TitlebarImageList key={index} data={listData} listIndex={index} setNext={setCurrentlyVisible}/>
        ))}

      </div>
    </Layout>
  );
};

export default Home;
