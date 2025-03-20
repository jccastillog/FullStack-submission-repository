// components/Filter.js
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer'; // Importamos la acción desde filterReducer

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter)); // Usamos la acción generada automáticamente
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;