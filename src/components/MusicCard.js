import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  handleCheck = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
      loading: true,
    }), async () => {
      const { trackId } = this.props;
      await addSong(trackId);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const {
      previewUrl,
      trackId,
      trackName,
    } = this.props;
    const { isChecked, loading } = this.state;
    const audioTrack = (
      <>
        <div>{trackName}</div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favCheck" className="favorita">
          Favorita
          {' '}
          <input
            data-testid={ `checkbox-music-${trackId}` }
            defaultChecked={ isChecked }
            id={ trackId }
            name="favCheck"
            type="checkbox"
            onChange={ this.handleCheck }
          />
        </label>
      </>);

    return (
      <div className="tracks">
        {loading
          ? <div className="track-space"><Loading /></div>
          : audioTrack}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
