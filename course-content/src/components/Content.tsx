import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
};

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part, index) => (
        <>
        <Part key={index} {...part} />
        <br />
        </>
      ))}
    </>
  );
};

export default Content;