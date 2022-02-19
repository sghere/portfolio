import React from 'react';
import styled from 'styled-components';
import Proj from './project.js';
import img from '../Images/proj1.JPG';
import img2 from '../Images/proj2.JPG';
import img3 from '../Images/proj5.JPG';
import img4 from '../Images/proj4.JPG';
import img5 from '../Images/proj3.JPG';
import img6 from '../Images/proj6.JPG';

const About = () => {
  const AboutContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  return (
    <>
      {/* <div class="dark">Drag the bubbles to move them</div> */}
      <AboutContainer>
        <div class="container mt-5 pt-5">
          <h1 data-aos="fade-up" class="display-4" style={{ color: 'white' }}>
            Projects
          </h1>
          <Proj
            name="Mahalaxmi Sanitary"
            description="Catalog Website for Mahalaxmi Sanitary"
            link="https://mahalaxmisanitary.com/"
            img={img6}
          />
          <Proj
            name="Consultancy Firm"
            description="Online Consultancy Firm with .Net Framework using Sql As Backend"
            link="https://trafersind.somee.com/"
            img={img}
          />
          <Proj
            name="TrafersInd"
            description="An Indian traffic exchange Website, which can exchange the traffic coming from your website to others."
            link="https://trafersind.somee.com/"
            img={img2}
          />
          <Proj
            name="Shubham Antique Shop"
            description="Informative Website For Antiques Buying And Selling"
            link="https://shubhamantiques.online/"
            img={img3}
          />
          <Proj
            name="Online File Transfer"
            description="File transfer Website upto 3-4MB"
            link="https://bytectrl.tech/bitectrlfileupload/"
            img={img4}
          />
          <Proj
            name="ByteCtrl"
            description="Software Development Company"
            link="https://bytectrl.tech/"
            img={img5}
          />
        </div>
      </AboutContainer>
    </>
  );
};
export default About;
