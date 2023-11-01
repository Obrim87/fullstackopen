import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member ${value}`);
  };

  switch (course.kind) {
    case 'basic':
      return <i>{course.description}</i>;
    case 'group':
      return <>{course.groupProjectCount}</>;
    case 'background':
      return (
        <>
          <i>{course.description}</i>
          <br />
          Submit to: {course.backgroundMaterial}
        </>
      );
    case 'special':
      return (
        <>
          <i>{course.description}</i>
          <br />
          required skills: {course.requirements.join(', ')}
        </>
      );
    default:
      return assertNever(course);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <p key={course.name}>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <Part course={course} />
        </p>
      ))}
    </div>
  );
};

export default Content;
