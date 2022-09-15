import React from 'react';
import styled from 'styled-components';
import Proj from './project.js';
import img from '../Images/proj1.JPG';
import img2 from '../Images/proj2.JPG';
import img3 from '../Images/proj5.JPG';
import img4 from '../Images/proj4.JPG';
import img5 from '../Images/proj3.JPG';
import img6 from '../Images/proj6.JPG';
import img7 from '../Images/proj7.JPG';

const About = () => {
  const AboutContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  return (
    <>
      {/* <div class="dark">Drag the bubbles to move them</div> */}
      <div class="container mt-5 pt-5 text-dark">
        <code>
          <div class="jumbotron">
            <h1 class="display-4 pb-5">Hi, How's it going ?</h1>
            <p class="lead" data-aos="fade-up">
              &nbsp; My name is Shubham Gaikwad and currently I work as a
              Associate Software Engineer at SMARTe Before that, I worked as a
              Software Engineer at Softcomp Solutions for 1 Year and 3 Months.
            </p>
            <p class="lead" data-aos="fade-up">
              &nbsp; I got a chance to do around 15 projects / demonstrations
              which included writeups, mini projects, final year projects. In
              this portfolio I've also added demos that are chosen and made by
              myself.
            </p>
            <p class="lead" data-aos="fade-up">
              &nbsp; As a Software Engineer, I currently work on ReactJS, NextJS
              and MySQL. I enjoy making things on web. I also know basics of app
              development but my main intrest is on web development. My intrest
              started way back when i started my BSc IT in 2015 from DG Ruparel
              college.
            </p>
            <p class="lead" data-aos="fade-up">
              &nbsp; Then, I completed MCA from Veermata Jijabai Technological
              Institute. MCA exposed me to various new technologies such as data
              science, data mining, blockchain, AI, ML, etc.
            </p>

            <blockquote class="blockquote text-right" data-aos="fade-up">
              <p class="mb-0">lay ghasliye</p>
              <footer class="blockquote-footer">Shubham Gaikwad</footer>
            </blockquote>
          </div>
        </code>
      </div>
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
            name="WhatsAppDM"
            description="Direct Message on Whatsapp without saving Number"
            link="https://whatsappdm.bytectrl.tech/"
            img={img7}
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
