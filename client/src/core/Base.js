import React from 'react';
import PropTypes from 'prop-types';

const Base = ({
  title = 'My Title',
  description = 'My Description',
  children,
}) => (
  <div>
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </div>
    <footer>
      <div>
        <h4></h4>
        <button></button>
      </div>
      <div>
        <span></span>
      </div>
    </footer>
  </div>
);

Base.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default Base;
