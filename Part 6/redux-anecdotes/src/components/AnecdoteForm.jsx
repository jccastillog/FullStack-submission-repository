import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationActions';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const createdAnecdote = await anecdoteService.createNew(newAnecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`New anecdote: "${newAnecdote}"`, 2)); // Muestra la notificación durante 5 segundos
    setNewAnecdote("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={newAnecdote}
            onChange={(event) => setNewAnecdote(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
