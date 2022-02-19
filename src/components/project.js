import React from 'react';
import styled from 'styled-components';
// import img from '../Images/Capture.JPG';
import { motion } from 'framer-motion';

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem 3rem;
  box-shadow: 10px 0px 30px black;
  margin-top: 50px;
`;

const Image = styled.img`
  border: 5px solid white;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  padding: 5px;
  margin-top: 10px;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 3rem;
  font-size: 1rem;
  outline: none;
  background: transparent;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 4px;
  color: white;

  text-decoration: NONE;
`;

const project = (props) => {
  const name = props.name;
  const description = props.description;
  const link = props.link;
  const img = props.img;

  return (
    <Card data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
      <div class="row">
        <div class="col-sm-6">
          <h1>{name}</h1>
          <p>{description}</p>
          <a href={link}>
            <Button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              Visit
            </Button>
          </a>
        </div>
        <div class="col-sm-6">
          <Image src={img} alt="abc" />
        </div>
      </div>
    </Card>
  );
};

export default project;
