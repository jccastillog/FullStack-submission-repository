const Header = (props) =>{
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Content = (props) =>{
  return (
    <div>
      <p>
        {props.part}
      </p>
    </div>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>
      Number of exercises {props.exercises}
      </p>
    </div>
  )
}

const App = () => {
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
      <Header course = {course.name}/>
      <Content part = {course.parts[0].name}/> <Total exercises = {course.parts[0].exercises} />
      <Content part = {course.parts[1].name}/> <Total exercises = {course.parts[1].exercises} />
      <Content part = {course.parts[2].name}/> <Total exercises = {course.parts[2].exercises} />
      <Total exercises =  {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App