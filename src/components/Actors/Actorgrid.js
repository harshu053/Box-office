import React from 'react'
import { Actorcard } from './Actorcard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { Flexgrid } from '../Styled'

export const Actorgrid = ({data}) => {
  return (
    <Flexgrid>
      {data.map(({person})=>
       <Actorcard 
        key={person.id} 
        name={person.name} 
        country={person.country? person.country.name : null} 
        birthday={person.birthday} 
        deathday={person.deathday} 
        gender={person.gender} 
        image={person.image? person.image.medium : IMAGE_NOT_FOUND}
       />
      )}
    </Flexgrid>
  )
}
