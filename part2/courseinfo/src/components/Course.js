function Course({ courses }) {
  return (
    <>
      <h1>Web development cirriculum</h1>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </>
  )
}

const Header = ({ name }) => <h2>{name}</h2>

function Content({ parts }) {
  return (
   <div>
    {parts.map(part => 
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    )}
   </div>
  )
}

function Total({ parts }) {
  let num = parts.reduce(
    (acc, cur) => {
      return acc + cur.exercises
    }, 0
  )

  return (
    <p><strong>total of {num} exercises</strong></p>
  )
}

export default Course