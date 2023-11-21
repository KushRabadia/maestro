import CarouselComponent, { Course } from '@/components/carousel';
import Loader from '@/components/loader';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { useSession, signIn } from "next-auth/react";
import { RootState } from '@/store/store';
import { setUser } from '@/store/actions/userActions';
import Layout from '@/layout/layout';
import { User } from '@/types';
import { getCourses, loginSocial } from '../lib/config';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession()
  const user: User | null = useSelector((state: RootState) => state.user).user;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  const signinHandler = useCallback(async () => {
    try {
      setLoading(true);
      if (status === "loading" || !session) return;
      const { email, name } = session.user || {};
      if (email && name) {
        const bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('name', name);

        const response = await fetch(loginSocial, {
          method: 'POST',
          body: bodyFormData
        });

        if (!response.ok) {
          const resData = await response.json();
          if (response.status === 401 || response.status === 422) {
            console.log(resData.message);
            throw new Error('Validation failed.');
          } else {
            console.log('Error!');
            throw new Error('Validation failed!');
          }
        }
  
        const resData = await response.json();
        const userData: User = resData.user;
        dispatch(setUser(userData));
  
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('token', resData.token);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, session, status]);

  useEffect(() => {
    signinHandler();
  }, [signinHandler]);

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
