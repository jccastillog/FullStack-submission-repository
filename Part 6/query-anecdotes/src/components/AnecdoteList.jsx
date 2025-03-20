/* eslint-disable react/prop-types */
// components/AnecdoteList.js
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateAnecdote } from '../requests/request';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const [, dispatch] = useContext(NotificationContext);

  // Mutación para actualizar los votos
  const voteMutation = useMutation({
    mutationFn: updateAnecdote, // Función que realiza la mutación
    onSuccess: (updatedAnecdote) => {
      // Actualiza la caché de React Query con la anécdota actualizada
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) =>
        oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for: "${updatedAnecdote.content}"` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(updatedAnecdote); // Envía la anécdota actualizada al backend
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;