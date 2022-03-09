import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { NavLink } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      artistName,
      artworkUrl100,
      collectionId,
      collectionName,
    } = this.props;

    return (
      <div className="card">
        <NavLink
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img alt={ collectionName } src={ artworkUrl100 } />
        </NavLink>
        <h4>{collectionName}</h4>
        <h6>{artistName}</h6>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default Card;
