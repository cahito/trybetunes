import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { NavLink } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      artistName,
      artworkUrl100,
      collectionName,
    } = this.props;

    return (
      <NavLink to="/album/:id">
        <div className="card">
          <img alt={ collectionName } src={ artworkUrl100 } />
          <h4>{ collectionName }</h4>
          <h6>{ artistName }</h6>
        </div>
      </NavLink>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default Card;
