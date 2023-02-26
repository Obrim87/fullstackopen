import { useState } from 'react'

function Header({ name }) {
  return (
    <h1>{name}</h1>
  )
}

function Content(props) {
  return (
    <>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  )
}

function Total(props) {
  let num = 0
  props.parts.forEach(elem => {
    num += elem.exercises
  })
  return (
    <p>Number of exercises {num}</p>
  )
}

function App() {
  const [ counter, setCounter ] = useState(10)

  console.log(counter, setCounter)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header {...course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}

export default App