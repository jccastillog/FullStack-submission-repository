import { useState } from 'react'
const History = (props) => {
  if (props.allClicks===0){
    return(
    <div>
      No feedback given
    </div>
    )
  }
  return (
    <div>
      {props.text} = {props.value}
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [avgClicks, setAvg] = useState(0)

  const handleGood = () => {
    setAll(allClicks+1)
    setGood(good + 1)
    setAvg(avgClicks+1)
  }

  const handleNeutral = () => {
    setAll(allClicks+1)
    setNeutral(neutral + 1)
    setAvg(avgClicks+0)
  }
  
  const handleBad = () => {
    setAll(allClicks+1)
    setBad(bad + 1)
    setAvg(avgClicks-1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
    
      <Button handleClick={handleGood} text='Good' />
      <Button handleClick={handleNeutral} text='Neutral' />
      <Button handleClick={handleBad} text='Bad' />

      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td><History text="Good" value={good}/></td>
            <td><History text="Neutral" value={neutral}/></td>            
            <td><History text="Bad" value={bad}/></td>
          </tr>
          <tr>
            <td><History text="Total Clicks" value={allClicks}/></td>
            <td><History text="Promedio" value={(good*1+bad*-1)/allClicks}/></td>            
            <td><History text="Positivos" value={(good/allClicks)*100}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App