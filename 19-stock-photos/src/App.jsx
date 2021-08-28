import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = '?client_id=Koj0RIYaR1YorPqoefd3KzaZWnt0YYwJtAX41Q5unKo'
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App () {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos(oldPhotos => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setPage(oldPage => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setPage(1)
    fetchImages()
  }
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            onChange={e => setQuery(e.target.value)}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />{' '}
          </button>
        </form>
      </section>
      <section className='photos '>
        <div className='photos-center'>
          {photos.map(photo => {
            return <Photo key={photo.id} {...photo} />
          })}
        </div>
        {loading && <h1 className='loading'>Loading...</h1>}
      </section>
    </main>
  )
}

export default App
