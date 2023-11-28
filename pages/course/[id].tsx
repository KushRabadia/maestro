import Loader from '@/components/loader';
import Tab from '@/components/tab';
import Layout from '@/layout/layout';
import CommentIcon from '@mui/icons-material/Comment';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Unstable_Grid2';
import { setUser } from '@/store/actions/userActions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { User, Course } from '@/types';
import { useAuthToken } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { getVideos, updateUser, getCourse } from '../../lib/config';

interface VideoItem {
  videoId: string;
  title: string;
}

interface CheckboxListProps {
  data: VideoItem[];
  setVideoId(videoId: string): void;
}

const MediaCard: React.FC<{ videoId: string }> = ({ videoId }) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    height: '720',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

const CheckboxList: React.FC<CheckboxListProps> = ({ data, setVideoId }) => {
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
    <List
      sx={{
        width: '100%',
        maxHeight: '100px',
        bgcolor: 'background.paper',
      }}
    >
      {data.map((video, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding className={'courseVideoListItem'}>
            <Grid container className={'course_listItems'}>
              <Grid xs={1}>
                <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(index) !== -1}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{ padding: 0, margin: 0 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Grid>
              <Grid xs={11}>
                <ListItemButton role={undefined} onClick={() => setVideoId(video.videoId)} dense>
                  <ListItemText id={labelId} primary={video.title} />
                </ListItemButton>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

const CoursePage: React.FC = () => {
  const dispatch = useDispatch();
  const user: User | null = useSelector((state: RootState) => state.user).user;
  const [data, setData] = useState([]);
  const [course, setCourse] = useState<Course>();
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const labels = ['Description', 'Q&A', 'Notes'];
  const [labelItems, setLabelitems] = useState<string[]>([]); 
  const [refreshToken, setRefreshToken] = useState<boolean>(false);
  const { token } = useAuthToken({refresh: refreshToken});
  const courseId: string = Array.isArray(router.query.id) ? router.query.id[0] : (router.query.id || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getVideos, {
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

    const fetchCourse = async () => {
      try {
        const response = await fetch(`${getCourse}${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const course: Course = data.course;
        setCourse(course);
        setLabelitems([course.description]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (courseId !== '') {
      fetchData();
      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {
    const updateUserCourses = async () => {
      try {
        const response = await fetch(updateUser, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({ courseId: courseId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const userData: User = data.user;
        dispatch(setUser(userData));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user && courseId !== '' && token) {
      const isCourseThere = user.courses.includes(courseId);
      if (!isCourseThere) updateUserCourses();
    }
  }, [user, courseId, token, dispatch]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid xs={9}>
            <MediaCard videoId={videoId} />
              <Tab labels={labels} labelItems={labelItems}/>
          </Grid>
          <Grid xs={3} className={'courseVideoList'}>
            <CheckboxList data={data} setVideoId={setVideoId} />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default CoursePage;
