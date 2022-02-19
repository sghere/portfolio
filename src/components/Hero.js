import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import btn1 from '../Images/reactjs.svg';
import btn2 from '../Images/nodejs.svg';
import btn3 from '../Images/mongodb.svg';
import btn4 from '../Images/database.svg';

import resume from '../Images/ShubhamGaikwad.pdf';

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  padding: 3rem calc((100vh-1300px) / 2);

  @media screen and (max-width: 250px) {
    grid-template-columns: 1fr;
  } ;
`;

const Button = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1rem;
  outline: none;
  background: transparent;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 4px;
  color: white;
  box-shadow: 20px 0px 30px black;
`;

const ColumnLeft = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;
  box-shadow: 10px 10px 20px black;
`;

const Image = styled(motion.img)`
  position: absolute;
  height: 80%;
  width: 80%;
  max-width: 150px;
  max-height: 150px;

  box-shadow: 20px 0px 30px black;
  padding: 10px;

  @media screen and (max-width: 768px) {
    height: 80px;
    width: 80px;
  } ;
`;

const ColumnRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;

  ${Image}:nth-child(1) {
    top: 100px;
    left: -50px;
  }
  ${Image}:nth-child(2) {
    top: 155px;
    right: 160px;
  }
  ${Image}:nth-child(3) {
    top: 350px;
    right: 80px;
  }
  ${Image}:nth-child(4) {
    right: 250px;
    top: 450px;
  }
`;

const Hero = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div class="container-fluid">
      <Section>
        <Container>
          <ColumnLeft>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              class="display-4"
            >
              Shubham Gaikwad
            </motion.h1>
            <motion.p
              class="lead"
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
            >
              Software Engineer,<td></td>
              <a
                href="https://wa.link/e6wrwz"
                style={{ textDecoration: 'none', color: 'aqua' }}
              >
                8655301910
              </a>
            </motion.p>
            <a href={resume} download>
              <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: 0.95,
                  backgroundColor: '#3498db',
                  border: 'none',
                  color: '#000',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
              >
                Resume
              </Button>
            </a>
          </ColumnLeft>
          <ColumnRight>
            <Image
              src={btn1}
              alt="planet"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              drag={true}
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
            />

            <Image
              src={btn2}
              alt="planet"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              drag={true}
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
            />

            <Image
              src={btn3}
              alt="planet"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              drag={true}
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
            />

            <Image
              src={btn4}
              alt="planet"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              drag={true}
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 100,
              }}
            />
          </ColumnRight>
        </Container>
      </Section>
    </div>
  );
};

export default Hero;
