import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import GitHubSection from './components/sections/GitHubSection';
import ContactSection from './components/sections/ContactSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <CertificatesSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
