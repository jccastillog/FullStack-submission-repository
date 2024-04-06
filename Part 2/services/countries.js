import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delereg = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
  .catch(error => {
    setErrorMessage(
      `the phone '${request.name}' wasn't already deleted from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  })
}

export default { getAll, create, update, delereg }