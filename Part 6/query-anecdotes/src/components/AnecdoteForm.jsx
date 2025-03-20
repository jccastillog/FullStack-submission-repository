import { useQueryClient, useMutation } from '@tanstack/react-query' 
import { createAnecdote } from "../requests/request";
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const [, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, // Función que realiza la mutación
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']); // Refresca la lista de anécdotas
      dispatch({ type: 'SET_NOTIFICATION', payload: `New anecdote: "${newAnecdote.content}"` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 }); // Crea la nueva anécdota
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
