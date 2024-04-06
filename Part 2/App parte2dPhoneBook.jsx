import { useState, useEffect } from 'react'
import AddPhones from './components/AddPhones'
import Phone from './components/Phones'
import SearchPhone from './components/SearchPhones'
import phoneService from './services/phones'


const App = (props) => {
  const [phones, setPhones] = useState([])
  const [newPhone, setNewPhone] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [search, setSearch] = useState('')
  const [deleted,setDeleted] = useState('')


  useEffect(() => {
    phoneService
      .getAll()
      .then(phones => {
        setPhones(phones)
      })
  }, [])

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
      phoneService
        .create(phoneObject)
        .then(returnedNote => {
          setPhones(phones.concat(returnedNote))
          setNewPhone('')
          setNewNumber('')
          setSearch('')
      })
    }else {
      console.log('Phone number already exists.')
      if (window.confirm(`${newPhone} is already added to phonebook,replace de old number with a new one`)){
        const idupdate = phones.find(n => n.name === newPhone).id
        const phoneObject = { name: newPhone, number: newNumber }
        console.log(idupdate)
        phoneService
        .update(idupdate,phoneObject)
        .then(returnedNote => {
          setPhones(phones.map(phone => phone.id !== idupdate ? phone : returnedNote))
          setNewPhone('')
          setNewNumber('')
          setSearch('')
        })
      }
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

  const handleDelete = (event) => {
    setDeleted(event.target.value)

  }

  const makeDelete = (event) => {
    const iddel=(event.target.value)
    const namedel = phones.find(n => n.id === iddel).name
    if (window.confirm(`Delete ${namedel}`)) {
      phoneService
      .delereg(iddel)
      .then(returnedNote => {
        setPhones(phones.map(phone => phone.id !== iddel ? phone : ''))
      })
  }
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
          <Phone phone={phone} makeDelete={makeDelete}/>
        )}
    </div>
  )
}

export default App