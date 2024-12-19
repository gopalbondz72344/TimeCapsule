import Hero from '../sections/Hero';
import About from '../sections/About';
import Contact from '../sections/Contact';

const HomePage = () => {

    return (
      <div className="min-h-screen flex flex-col">
      <Hero />
      <About />
      <Contact />
  </div>
    );
};

export default HomePage;
