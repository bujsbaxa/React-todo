import listIcon from '../assets/images/list.svg'
import gridIcon from '../assets/images/grid.svg'
import { useState } from 'react'
import NotesItem from './NotesItem'
import clsx from 'clsx'

const Notes = ({ notes }) => {
    
    const [view, setView] = useState(true)

    
    let img = view ? listIcon : gridIcon
    let word = view ? "Список" : "Сетка"
    
    let notesListClass = clsx('notes__list', {'active' : !view})
    
  return (
   <>
        <main className="main">
            <div className="container">
                <div className="notes__top">
                    <h2 className="notes__top-title">Все заметки</h2>
                    <button className="notes__top-btn" onClick={() => setView(!view)}>
                        <img src={img} alt="" />
                        <span>{word}</span>   
                    </button>
                </div>
                <div className={notesListClass}>
                    {notes.map((note) => (
                        <NotesItem
                        key={note.id}
                        view={view}
                        note={note}
                    />
                    ))}
                </div>
            </div>
        </main>
    </>
  )
}

export default Notes