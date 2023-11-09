import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '../../src/layout/layout';
import Container from '@mui/material/Container';
import YouTube, { YouTubeProps } from 'react-youtube';
import List from '@mui/material/List';
import Grid from '@mui/material/Unstable_Grid2';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { CircularProgress } from '@mui/material';

interface VideoItem {
  videoId: string;
  title: string;
}

interface CheckboxListProps {
  data: VideoItem[];
  setVideoId(videoId: string): void;
}

const MediaCard: React.FC<{videoId: string}> = ({videoId}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts = {
    height: '720',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
  );
}

const CheckboxList: React.FC<CheckboxListProps>  = ({data, setVideoId}) => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: '100%', maxHeight: '100px', bgcolor: 'background.paper' }}>
      {data.map((video, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            disablePadding
            className={'flexRowCenter'}
          >
            <Grid container className={'course_listItems'}>
              <Grid xs={2}>
                <ListItemButton 
                  role={undefined} 
                  onClick={handleToggle(index)} 
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(index) !== -1}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{padding:0, margin: 0}}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Grid>
              <Grid xs={8}>
                <ListItemButton 
                  role={undefined} 
                  onClick={() => setVideoId(video.videoId)} 
                  dense
                >
                  <ListItemText id={labelId} primary={video.title} />
                </ListItemButton>
              </Grid>
              <Grid xs={2}>
                <ListItemButton 
                  role={undefined} 
                  onClick={handleToggle(index)} 
                  dense
                >
                  <ListItemIcon>
                    <CommentIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
}

const Course: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [videoId, setVideoId] = React.useState("");
  const [loading, setLoading] = React.useState<Boolean>(false);
  const router = useRouter();
  const courseId = router.query.id;
  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/video/videos", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId: courseId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVideoId(data.videos[0].videoId);
        setData(data.videos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <Layout>
      <div className='spinner-circle'>
      <Grid container>
        {loading && <CircularProgress />}
        <Grid xs={10}>
          <MediaCard videoId={videoId}/>
        </Grid>
        <Grid xs={2}>
          <CheckboxList data={data} setVideoId={setVideoId}/>
        </Grid>
      </Grid>
      </div>
    </Layout>
  );
};

export default Course;