import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>
  
const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    setCounter(counter + 1)
    console.log('increasing, value before', counter)
  }

  const decreaseByOne = () => {
    setCounter(counter - 1)
    console.log('decreasing, value before', counter)
  }

  const setToZero = () => {
    setCounter(0)
    console.log('resetting to zero, value before', counter)
  }

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onSmash={increaseByOne}
        text='plus'
      />
      <Button
        onSmash={setToZero}
        text='zero'
      />
      <Button
        onSmash={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

export default App