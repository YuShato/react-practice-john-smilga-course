import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa'
import data from './data'

function Alternative () {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  const nextSlide = () => {
    setIndex(oldIndex => {
      let index = oldIndex + 1
      if (index > people.length - 1) {
        index = 0
      }
      return index
    })
  }

  const prevSlide = () => {
    setIndex(oldIndex => {
      let index = oldIndex - 1
      if (index < 0) {
        index = people.length - 1
      }
      return index
    })
  }

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 3000)
    return () => clearInterval(slider)
  }, [index])

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>
          reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          let position = 'nextSlide'
          if (personIndex === index) {
            position = 'activeSlide'
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide'
          }
          const { id, image, name, title, quote } = person
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          )
        })}
        <button className='prev' onClick={nextSlide}>
          <FaChevronLeft />
        </button>
        <button className='next' onClick={prevSlide}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

export default Alternative
