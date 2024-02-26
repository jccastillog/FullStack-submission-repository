import { useState } from 'react'
import AddPhones from './components/AddPhones'
import Phone from './components/Phones'
import SearchPhone from './components/SearchPhones'


const App = (props) => {
  const [phones, setPhones] = useState(
    [{ name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}]
  ) 
  const [newPhone, setNewPhone] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [search, setSearch] = useState('')


  const phoneSearch = phones.filter((el) => {
    if(search === ''){
      return el
    }
    else{
      return el.name.toLowerCase().includes(search)
    }
  }) 

  const addPhone = (event) => {
    event.preventDefault()
    if (!phones.some(phone => phone.name === newPhone)) {
      const phoneObject = { name: newPhone, number: newNumber }
      setPhones(phones.concat(phoneObject))
      setNewPhone('')
      setNewNumber('')
      setSearch('')
    } else {
      console.log('Phone number already exists.')
      alert(`${newPhone} is already added to phonebook`)
      setNewPhone('')
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPhone
          search={search}
          handleSearchChange={handleSearchChange}
      />

      <h2>Add a New</h2>
      <AddPhones
        addPhone={addPhone}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {phoneSearch.map(phone => 
          <Phone phone={phone} />
        )}
    </div>
  )
}

export default App