import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import useCustomStore from "../../customStore";
import s from './Search.module.scss';
import AudioController from "../../utils/AudioController";
import { useDropzone } from "react-dropzone";

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore(state => state.setSongs)

    const onDrop = (audio) => {
        const src = URL.createObjectURL(audio[0]);
        const audioObject = {
          title: audio[0].name,
          album: {
            cover_small: "",
          },
          preview: src,
        };
    
        setSongs([audioObject]);
        // setSelectedSong(audioObject);
      };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick : true,
        accept : {
            "audio/mpeg": [".mp3"],
        },
    })

    useEffect(() => {
        AudioController.setup();
    })

    const onKeyDown = (e) => {
        if (e.keyCode  === 13 && e.target.value !== "") {
            getSongs();
        }
    }

    const getSongs = async () => {
        let response = await fetchJsonp(
          `https://api.deezer.com/search?q=${artist}&output=jsonp`
        );
    
        response = await response.json();
        
        const data = response.data.slice(0,10);
        AudioController.ctx.resume()
        setSongs(data);
        setArtist("")
    };

    console.log(isDragActive);

    return (
        <div className={s.searchWrapper} {...getRootProps()}>
            <input 
                type="text" 
                value={artist}
                onChange={(e) => setArtist(e.target.value)} 
                onKeyDown={onKeyDown}
            />

           {isDragActive && <input className={s.inputDropZone} {...getInputProps} />}
        </div>
    )
}

export default Search