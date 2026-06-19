import Hero from './components/Hero';
import BentoSkills from './components/BentoSkills';
import FeaturedEngineering from './components/FeaturedEngineering';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <main className="main-layout">
        <Hero />
        <BentoSkills />
        <FeaturedEngineering />
      </main>
      <Footer />
    </div>
  );
}

export default App;
