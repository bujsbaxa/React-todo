import React, { useState } from 'react'
import searchIcon from '../assets/images/search.svg'
import backIcon from '../assets/images/back.svg'
import closeIcon from '../assets/images/close.svg'

const Navbar = ({search, setSearch}) => {
  
  const [nav, setNav] = useState(true)
  
  const reset = () => {
    setNav(true)
    setSearch('')
  }
  return (
    <>
       <header className="header">
        {nav ? (
          <nav className="header__nav">
          <button className="header__nav-lang">RU</button>
          <h1 className="header__nav-title">Заметки</h1>
          <img src={searchIcon} 
          alt="" 
          className="header__nav-search" 
          onClick={() => setNav(false)}
           />
      </nav>
        ) : (
          <nav className="header__nav">
          <img src={backIcon} alt="" onClick={() => reset()}/>
          <input 
          type="text" 
          className="header__nav-input" 
          placeholder='Поиск...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          />
          <img src={closeIcon} alt="" onClick={() => setSearch('')}/>
      </nav> 
        )}
        
       </header>
    </>
  )
}

export default Navbar