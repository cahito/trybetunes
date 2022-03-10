import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends React.Component {
  handleCheck = (event) => {
    if (event.value === checked) {
      
    }
  }

  render() {
    const {
      previewUrl,
      trackId,
      trackName,
    } = this.props;
    return (
      <div className="tracks">
        <div>{ trackName }</div>
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
            name="favCheck"
            type="checkbox"
            onChange={ this.handleCheck }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
