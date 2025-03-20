// anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

// Exportamos las acciones generadas automáticamente
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll(); // Obtiene las anécdotas del backend
    dispatch(setAnecdotes(anecdotes)); // Despacha la acción para establecer las anécdotas en el store
  };
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes; // Obtenemos el estado actual
    const anecdoteToVote = anecdotes.find((a) => a.id === id); // Buscamos la anécdota
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }; // Incrementamos los votos

    await anecdoteService.updateVotes(id, updatedAnecdote); // Actualizamos el backend
    dispatch(voteAnecdote(id)); // Despachamos la acción para actualizar el store
  };
};

// Exportamos el reducer
export default anecdoteSlice.reducer;