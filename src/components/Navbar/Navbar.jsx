import "./Navbar.scss";
import { useState } from "react";
import { useToggleRoomStore } from "../../stores/toggleRoomStore";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const Navbar = () => {
  const { isDarkRoom } = useToggleRoomStore();
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef();

  const navClassNames = `navbar${!isDarkRoom ? " light" : ""}`;

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element.offsetTop, autoKill: false },
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "dev-work", "design-work"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={navClassNames}>
      <div className="navbar-container">
        <button
          className={`nav-item ${activeSection === "home" ? "active" : ""}`}
          onClick={() => scrollToSection("home")}
        >
          Home
        </button>
        <button
          className={`nav-item ${activeSection === "about" ? "active" : ""}`}
          onClick={() => scrollToSection("about")}
        >
          About
        </button>
        <button
          className={`nav-item ${activeSection === "dev-work" ? "active" : ""}`}
          onClick={() => scrollToSection("dev-work")}
        >
          Dev Work
        </button>
        <button
          className={`nav-item ${
            activeSection === "design-work" ? "active" : ""
          }`}
          onClick={() => scrollToSection("design-work")}
        >
          Design Work
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
