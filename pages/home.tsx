import CarouselComponent, { Course } from "@/components/carousel";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/layout/layout";

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
    fetch("http://localhost:8000/api/course/courses")
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
<<<<<<< HEAD
        {courses.map((listData, index) => (
          index===currentlyVisible && <TitlebarImageList 
            key={index} 
            data={listData} 
            listIndex={index}
            length={courses.length}
            setNext={setCurrentlyVisible}
          />
        ))}

=======
        {courses.map(
          (listData, index) =>
            index === currentlyVisible && (
              <CarouselComponent key={index} data={listData} />
            )
        )}
>>>>>>> 08b08291a1ac6e406e0d6628c5682fcca09e67b4
      </div>
    </Layout>
  );
};

export default Home;
