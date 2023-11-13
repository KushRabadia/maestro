import CarouselComponent, { Course } from '@/components/carousel';
import Loader from '@/components/loader';
import React, { useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import Layout from '@/layout/layout';
import { User } from '@/types';
import { getCourses } from '../lib/config';

const Home: React.FC = () => {
  const user: User | null = useSelector((state: RootState) => state.user).user;

  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    fetch(getCourses)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
        setLoading(false);
        if (user?.courses) {
          const userCourses = data.courses.filter((course: Course) => user?.courses.includes(course._id));
          setUserCourses(userCourses);
        }
      });
  }, [user]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="margin-md">
          <div className="carousel-container">
            <h2 className="carousel-header">Your Courses</h2>
            <CarouselComponent data={userCourses} />
          </div>
          <div className="carousel-container">
            <h2 className="carousel-header">What Others Are Learning</h2>
            <CarouselComponent data={courses} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
