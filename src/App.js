import './App.css';
import Hero from './components/Hero.js';
import About from './components/About.js';
import P from './components/projectTemplate.js';
import { Parallax } from 'react-parallax';
import bgimg1 from './Images/bgimg1.jpg';
import AOS from 'aos';

function App() {
  AOS.init();
  return (
    <Parallax bgImage={bgimg1} strength={500}>
      <Hero />
      <About />
      <P />
    </Parallax>
  );
}

export default App;
