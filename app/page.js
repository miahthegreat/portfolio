import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "@/components";

const Home = () => {
  return (
    <main className="relative pt-24 z-0 bg-primary font-poppins">
      <div className="">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Tech />
      <Works />
      <div className="relative z-0">
        <Contact />
      </div>
      <StarsCanvas />
    </main>
  );
};

export default Home;
