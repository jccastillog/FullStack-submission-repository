import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Button2 = ({ handleVote, text }) => (
  <button onClick={handleVote}>
    {text}
  </button>
)


function findMaxPosition(array) {
  let maxIndex = 0;
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
        maxValue = array[i];
        maxIndex = i;
    }
}
  return maxIndex;
}





const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(8).fill(0))
  const [max,setMax]= useState(0)


  const handle = () => {
    var min = 0;
    var max = 8;
    var randomNumInRange = Math.floor(Math.random() * (max - min) + min)
    setSelected(randomNumInRange)
  }

  const handleVote = () => {
    const copy = [...voted]
    copy[selected] += 1;
    setVoted(copy);
    var maximo = findMaxPosition(voted)
    setMax(maximo)
    console.log(copy,maximo)
  }


  return (
    <div>
      {anecdotes[selected]} <br />
      has {voted[selected]} votes<br/>
      <Button2 handleVote={handleVote} text='Vote' />
      <Button handleClick={handle} text='Next Anecdote' />
      <br />
      Anecdote with most votes
      <br />
      {anecdotes[max]}
      <br />

    </div>
  )
}

export default App