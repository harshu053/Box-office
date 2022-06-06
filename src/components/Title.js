 import React from 'react'
import { TitleWrapper } from './Titled.style'
 
 export const Title = ({title,subtitle}) => {
   return (
     <TitleWrapper>
       <h1 >{title}</h1>
       <p>{subtitle}</p>
     </TitleWrapper>
   )
 }
 