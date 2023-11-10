import CarouselComponent, { Course } from "@/components/carousel";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/layout/layout";
import { getCourses } from "../lib/config";

const Home: React.FC = () => {
  const [currentlyVisible, setCurrentlyVisible] = React.useState<number>(0);
  const [courses, setCourses] = React.useState<Course[][]>([]);

  function chunkArray<Course>(array: Course[], chunkSize: number): Course[][] {
    const result: Course[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  useEffect(() => {
    console.log(getCourses);
    fetch(getCourses)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const chunkedArray: Course[][] = chunkArray(data.courses, 6);
        setCourses(chunkedArray);
      });
  }, []);

  return (
    <Layout>
      <div className="margin-md">
        {courses.map(
          (listData, index) =>
            index === currentlyVisible && (
              <CarouselComponent key={index} data={listData} />
            )
        )}
      </div>
    </Layout>
  );
};

export default Home;
