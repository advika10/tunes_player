import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context'
import SongItem from '../components/SongItem';
import DiscoverSongItem from '../components/DiscoverSongItem';

function Home() {
  const { discoverSongs, songList, loading, setDiscoverSongs } = useContext(GlobalContext);
  let title = '';
  useEffect(() => {
    async function getDiscoverSongs() {
      const response = await fetch(`https://v1.nocodeapi.com/hello12341/spotify/EMUKgGrOeQtlTPTO/browse/new`);
      const data = await response.json();

      if (data?.albums) {
        setDiscoverSongs(data?.albums?.items);
      }
    }
    getDiscoverSongs();
  }, []);


  if (loading) return <div>Loading... Please wait!</div>
  if (songList && songList.length > 0) {
    title = 'Results';
  } else {
    title = 'New Releases'
  }
  return (
    <>
      <h2 className='font-extrbold text-4xl truncate uppercase text-black'>{title}</h2>
    <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
      {
        songList && songList.length >0 ? 
        songList?.map(item=> <SongItem item={item}/>)
        :  
        discoverSongs?.map(item=> <DiscoverSongItem item={item}/>)
        }
    </div>
      </>
  )
}

export default Home