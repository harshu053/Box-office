 import React from 'react'
import { useLocation } from 'react-router-dom';

import { LinkStyled, NavList } from './Navs.styled';
 

 const LINKS=[
   {to:'/',text:'home'},
   {to:'/starred',text:'starred'},
 ];

 export const Navs = () => {

  const loaction= useLocation()
   return (
     <div>
       <NavList>
           {
             LINKS.map(item=><li key={item.to}><LinkStyled to={item.to} className={item.to===loaction.pathname ? 'active':''} >{item.text}</LinkStyled></li>)
           }
       </NavList>
     </div>
   )
 }
 