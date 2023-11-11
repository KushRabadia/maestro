import CarouselComponent, { Course } from "@/components/carousel";
import Loader from "@/components/loader";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/layout/layout";
import { getCourses } from "../lib/config";

const Home: React.FC = () => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);
  
  useEffect(() => {
  fetch("")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setLoading(false);
      setCourses(data.courses);
    });
  }, []);

  return (
    <Layout>
      {loading ? <Loader /> : (
        <div className="margin-md">
          <CarouselComponent data={courses} />
        </div>
      )}
      
    </Layout>
  );
};

export default Home;
