
import { useParams } from 'react-router-dom'
import { useShow } from '../components/Misc/Custom-hooks'
 
import { Cast } from '../components/Shows/Cast'
import { Detail } from '../components/Shows/Detail'
import { Seasons } from '../components/Shows/Seasons'
import { Showmaindata } from '../components/Shows/Showmaindata'
import { InfoBlock, ShowPageWrapper } from './Show.styled'


 

 

const Show = () => {
  const { id } = useParams();

  const {show,isLoading,error}=useShow(id);
   

     
    if (isLoading) {
      return <div>Data is being loaded</div>;
    }
    if (error) {
      return <div>Error occured: {error}</div>;
    }

  return(
    <ShowPageWrapper>
      <Showmaindata 
      image={show.image}
      name={show.name}
      rating={show.rating}
      summary={show.summary}
      tags={show.genres}
      />
      <InfoBlock>
          <h2>Details</h2>
          <Detail
          status={show.status}
          network={show.network}
          premiered={show.premiered}
          />
      </InfoBlock>

      <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={show._embedded.seasons}/>
      </InfoBlock>

      <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={show._embedded.cast}/>
      </InfoBlock>
  </ShowPageWrapper>
  );
};

export default Show;