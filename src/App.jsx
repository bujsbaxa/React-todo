import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Notes from "./components/Notes"
import editIcon from './assets/images/edit.svg'
import Modal from "./components/Modal"
import { ToDoContext } from "./context/todoContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  
  const setLS = () => localStorage.notes = JSON.stringify(notes)
  const getLs = () => localStorage.notes ? JSON.parse(localStorage.notes) : []
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState(getLs)
  const [isEdit, setIsEdit] = useState(false)
  const [editedNote, setEditedNote] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLS()
  }, [notes])
  
  const filteredNotes = notes.filter((item) => item.title.toLowerCase().includes(search.toLocaleLowerCase()))
  
  const openModal = () => {
    setIsModalOpen(true)
    setIsEdit(false)
    setEditedNote(null)
  }
  
  const closeModal = () =>{
    setIsModalOpen(false)
  }
  
  const addOrChangeHandler = (note) => {
    if (editedNote?.id) {
      const updatesNotes = notes.map((item) => {
        if(item.id == note.id) {
          return note
        }
        return item 
      })
      setNotes(updatesNotes)
      toast.success('Заметка успешно изменена', {
        position: 'top-right',
        autoClose: 2000
      })
    }else{
      setNotes([...notes , note])
      toast.success('Заметка успешно добавлена', {
        position: 'top-right',
        autoClose: 2000
    })
    }
    closeModal()
  }
  
  const deleteNoteHandler = (note) => {
    setNotes(notes.filter((item)=> item.id != note.id))
    toast.error('Заметка была удалена', {
      position: 'top-right',
      autoClose: 2000
    })
  }
  
  const editHandler = (note) => {
    setEditedNote(note)
    setIsEdit(true)
    setIsModalOpen(true)
  }
  
  
  return (
    <>
      <ToDoContext.Provider value={{
        deleteNoteHandler,
        addOrChangeHandler,
        closeModal,
        editHandler
      }}>
      <div className="wrapper">
        <Navbar search={search} setSearch={setSearch}/>
        <Notes
          notes={filteredNotes}
        />
        {isModalOpen && <Modal isEdit={isEdit} editedNote={editedNote} />}
        <button className="add__note"  onClick={openModal}>
          <img src={editIcon} alt="" />
        </button>
        <ToastContainer/>
      </div>
      </ToDoContext.Provider>
    </>
  )
}

export default App
