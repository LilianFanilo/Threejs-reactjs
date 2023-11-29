import s from './Song.module.scss';
import AudioController from '../../utils/AudioController';
import Scene from '../../webgl/Scene';

const Song = ({data}) => {
    // console.log(data);

    const pickSong = () => {
        AudioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_xl);
    }

    return (
        <div 
            className={s.song} 
            onClick={pickSong}
        >
            <img src={data.album.cover_medium} alt="" />
            <div className={s.infoSong}>
                <span className={s.title}>
                    {data.title}
                </span>
                <span>
                    {data.artist.name}
                </span>
            </div>

        </div>
    )
}

export default Song