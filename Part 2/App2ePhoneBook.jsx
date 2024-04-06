import { useState, useEffect } from 'react'
import AddPhones from './components/AddPhones'
import Phone from './components/Phones'
import SearchPhone from './components/SearchPhones'
import Notification from './components/Notification'
import phoneService from './services/phones'


const App = (props) => {
  const [phones, setPhones] = useState([])
  const [newPhone, setNewPhone] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [search, setSearch] = useState('')
  const [deleted,setDeleted] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [typeMsg, setTypeMsg] = useState('success')


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
        .then(returnedPhone => {
          setPhones(phones.concat(returnedPhone))
          setNewPhone('')
          setNewNumber('')
          setSearch('')
          setErrorMessage(`Added ${returnedPhone.name} `)
          setTypeMsg('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }else {
      console.log('Phone number already exists.')
      if (window.confirm(`${newPhone} is already added to phonebook,replace de old number with a new one`)){
        const idupdate = phones.find(n => n.name === newPhone).id
        const phoneObject = { name: newPhone, number: newNumber }
        phoneService
        .update(idupdate,phoneObject)
        .then(returnedPhone => {
          setPhones(phones.map(phone => phone.id !== idupdate ? phone : returnedPhone))
          setNewPhone('')
          setNewNumber('')
          setSearch('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${newPhone} has already been removed from server`)
          setTypeMsg('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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

  const makeDelete = (event) => {
    const iddel=(event.target.value)
    const namedel = phones.find(n => n.id === iddel).name
    if (window.confirm(`Delete ${namedel}`)) {
      phoneService
      .delereg(iddel)
      .then(returnedPhone => {
        setPhones(phones.map(phone => phone.id !== iddel ? phone : ''))
        setErrorMessage(`Deleted ${returnedPhone.name} `)
        setTypeMsg('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} typeMsg={typeMsg} />
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