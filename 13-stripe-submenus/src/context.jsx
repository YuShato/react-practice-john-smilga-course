import React, { useState, useContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true)
  const [location, setLocation] = useState({})
  const [page, setPage] = useState({ page: '', links: [] })

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find(link => link.page === text)
    setPage(page)
    setIsSubmenuOpen(true)
    setLocation(coordinates)
  }

  const closeSubmenu = () => {
    setIsSubmenuOpen(false)
  }

  return (
    <AppContext.Provider
      value={{
        isSubmenuOpen,
        isSidebarOpen,
        closeSubmenu,
        closeSidebar,
        openSubmenu,
        openSidebar,
        location,
        page
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
