import CarouselComponent, { Course } from "@/components/carousel";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/layout/layout";
import { getCourses } from "../lib/config";

const Home: React.FC = () => {
  const [courses, setCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    console.log(getCourses);
    fetch(getCourses)
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
