import React from 'react'
import { Showscard } from './Showscard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { Flexgrid } from '../Styled'
import { useShows } from '../Misc/Custom-hooks'

export const Showsgrid = ({data}) => {

  const[starredshows,dispatchstarred]=useShows()

  return (
    <Flexgrid>
      {data.map(({show})=>{
      

      const isStarred=starredshows.includes(show.id);

      const onstarclick=()=>{
       
        if(isStarred){
          dispatchstarred({type:'REMOVE',showId: show.id})
        }else{
          dispatchstarred({type:'ADD',showId: show.id})
        }

      }

       return(
        <Showscard 
        key={show.id} 
        id={show.id} 
        name={show.name} 
        image={show.image ? show.image.medium : IMAGE_NOT_FOUND  } 
        summary={show.summary}
        onstarclick={onstarclick}
        isStarred={isStarred}
       />
       );
      
      })}
    </Flexgrid>
  )
}
