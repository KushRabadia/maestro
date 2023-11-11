import CarouselComponent, { Course } from "@/components/carousel";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Layout from "@/layout/layout";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [courses, setCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/course/courses")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
      });
  }, []);

  return (
    <Layout>
      <div className="margin-md">
        <CarouselComponent data={courses} />
      </div>
    </Layout>
  );
};

export default Home;
