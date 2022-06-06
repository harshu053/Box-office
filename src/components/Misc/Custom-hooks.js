import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiget } from "./Config";


function showsReducer(prevState,action){
    switch(action.type){
        case 'ADD':{
            return [...prevState,action.showId]
        }
        case 'REMOVE':{
            return  prevState.filter ((showId)=>showId!==action.showId)
        }
        default:
            return  prevState
    }
}
function usePersistedReducer(reducer,intialstate,key){
    
    const[state,dispatch]=useReducer(reducer,intialstate,(intial)=>{
        const persisted=localStorage.getItem(key);
        return persisted? JSON.parse(persisted) : intial;
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state,key]);
    return [state,dispatch];
}

export function useShows(key='shows'){
    return usePersistedReducer(showsReducer,[],key);
}

export function useLastquery(key='lastquery'){
    const [input,setinput]=useState(()=>{
        const persisted=sessionStorage.getItem(key);
        return persisted? JSON.parse(persisted) : "";
    });


    const setpersistedinput=(newState)=>{
        setinput(newState);
        sessionStorage.setItem(key,JSON.stringify(newState));
    }

    return [input,setpersistedinput]
}

const reducer = (prevState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS': {
        return { isLoading: false, error: null, show: action.show };
      }
  
      case 'FETCH_FAILED': {
        return { ...prevState, isLoading: false, error: action.error };
      }
  
      default:
        return prevState;
    }
  };
export function useShow(showId){

    const [ state, dispatch] = useReducer(
        reducer,{
        show: null,
        isLoading: true,
        error: null,
        }
      );
       
      
    
      useEffect(() => {
        let isMounted = true;
    
        apiget(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
          .then(results => {
            if (isMounted) {
              dispatch({ type: 'FETCH_SUCCESS', show: results });
            }
          })
          .catch(err => {
            if (isMounted) {
              dispatch({ type: 'FETCH_FAILED', error: err.message });
            }
          });
    
        return () => {
          isMounted = false;
        };
      }, [showId]);

      return state;
}
