import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../core/NavBar';

const Base = ({
  title = 'My Title',
  description = 'My Description',
  children,
}) => (
  <div>
    <NavBar />
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </div>
    <footer>
      <div>
        <h4>If you got any questions, feel free to reach out.</h4>
        <button>Contact Us</button>
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
