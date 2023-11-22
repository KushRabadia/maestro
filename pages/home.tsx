import CarouselComponent, { Course } from '@/components/carousel';
import Loader from '@/components/loader';
import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Layout from '@/layout/layout';
import { User } from '@/types';
import { getCourses, loginSocial } from '../lib/config';

const Home: React.FC = () => {
  const user: User | null = useSelector((state: RootState) => state.user).user;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        setLoading(true);
        const res = await fetch(getCourses);
        const data = await res.json();
        setCourses(data.courses);
        setLoading(false);
  
        if (user?.courses) {
          const userCourses = data.courses.filter((course: Course) => user?.courses.includes(course._id));
          setUserCourses(userCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchData();
  }, [user]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="margin-md">
          {user?.courses && user?.courses.length > 0 && <div className="carousel-container">
            <h2 className="carousel-header">Your Courses</h2>
            <CarouselComponent data={userCourses} />
          </div>}
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
