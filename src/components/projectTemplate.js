import React from 'react';
import imgmy from '../Images/Capture.JPG';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const projectTemplate = () => {
  const Img = styled(motion.img)`
    border-radius: 50%;
    box-shadow: 20px 0px 30px black;

    max-width: 200px;
    max-height: 200px;
  `;

  return (
    <div class="container">
      <div class="row">
        <div data-aos="fade-down" class="col lefttemp ">
          <p class="shadow p-5">Drag me to throw me out of the screen</p>
        </div>
        <div data-aos="fade-up" class="col righttemp">
          <Img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            drag={true}
            src={imgmy}
            alt="Me"
          />
        </div>
      </div>
    </div>
  );
};

export default projectTemplate;
