import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch()
  
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch])

  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;