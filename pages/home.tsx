import CarouselComponent, { Course } from "@/components/carousel";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Layout from "@/layout/layout";
import { User } from '@/types';

const Home: React.FC = () => {
  const user: User | null = useSelector((state: RootState) => state.user).user;

  const [courses, setCourses] = React.useState<Course[]>([]);
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/course/courses")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
        if (user?.courses) {
          const userCourses = courses.filter(
            (course) => user?.courses.includes(course._id)
          );
          setUserCourses(userCourses);
        }
      });
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
