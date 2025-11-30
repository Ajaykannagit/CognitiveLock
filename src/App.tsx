import Hero from './components/Hero';
import InteractiveDemo from './components/InteractiveDemo';
import ConceptShowcase from './components/ConceptShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]"></div>
      <div className="relative">
        <Hero />
        <InteractiveDemo />
        <ConceptShowcase />
        <Footer />
      </div>
    </div>
  );
}

export default App;
