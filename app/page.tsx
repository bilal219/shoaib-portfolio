import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="content" className="pt-24 pb-24 lg:pb-24 lg:w-1/2 lg:py-24 space-y-20 lg:space-y-24">
        <About />
        <Education />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
