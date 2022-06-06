import React,{useState} from 'react'
import { Actorgrid } from '../components/Actors/Actorgrid';
import { Customradio } from '../components/Customradio';
import MainPageLayout from '../components/MainPageLayout'
import { apiget } from '../components/Misc/Config';
import { useLastquery } from '../components/Misc/Custom-hooks';
import { Showsgrid } from '../components/Shows/Showsgrid';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
 
 export const Home = () => {

  const [input,setinput]=useLastquery();
  const [res,setres]=useState(null);
  const [searchOption, setsearchOption]=useState('shows');

  const isshowsearch= searchOption==='shows';

  const onsearch=()=>{

    apiget(`/search/${searchOption}?q=${input}`).then(result=>{
      setres(result)
       console.log(result);
    })
  }

  


  const renderesult=()=>{

    if(res && res.length===0){
      return <div>no result</div>
    }

    if(res && res.length>0){
       return res[0].show ? ( <Showsgrid data={res}/>) :  ( <Actorgrid data={res}/> )   
 
    }
 
    return null;
  }

  const changeinput=(ev)=>{
    setinput(ev.target.value);
  }
  
  const onkey=(ev)=>{
    if(ev.keyCode===13){
      onsearch()
    }
  }

  const onradiochange=(ev)=>{
    setsearchOption(ev.target.value)
   }
 

   return ( 
      <MainPageLayout>
        <SearchInput 
          type="text" 
          placeholder='search for shows or actors.' 
          onChange={changeinput} 
          onKeyDown={onkey} 
          value={input} 
        />
        
        <RadioInputsWrapper>
          <div>
            <Customradio
              label="shows"
              id='shows-search'
              checked={isshowsearch} 
              value={'shows'} 
              onChange={onradiochange}
            />
          </div>
          <div>
          <Customradio
              label="actors"
              id='actors-search'
              checked={!isshowsearch} 
              value={'people'} 
              onChange={onradiochange}
            />
             
          </div>
        </RadioInputsWrapper>


        <SearchButtonWrapper>
          <button 
            type='button' 
            onClick={onsearch} >
              search
          </button>
        </SearchButtonWrapper>
        {renderesult()}
      </MainPageLayout>
   );
 }
 
