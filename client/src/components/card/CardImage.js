import React, { useEffect, useState } from 'react';
import { ImageWrapper } from './CardStyles';
import loadingImage from '../../data/images/cardboard-box.jpg';

const CardImage = ({ src, alt = '', cartItem }) => {
  const [imageSrc, setImageSrc] = useState(loadingImage);

  // start loading original image
  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setImageSrc(src);
    };
  }, [src]);
  return (
    <ImageWrapper cartItem={cartItem}>
      <img src={imageSrc} alt={alt} />
    </ImageWrapper>
  );
};

export default React.memo(CardImage);
