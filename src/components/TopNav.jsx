import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { getLenis } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

function TopNav() {
  const linksRef = useRef([]);

  useGSAP(() => {
    // Initial load animation for links
    gsap.fromTo(
      ".nav-link",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.3,
      }
    );

    // Scroll-triggered background animation
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#FFFFFF50",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );

    navTween.fromTo(
      ".nav-title",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "<0.2"
    );

    // Magnetic hover effect for links
    linksRef.current.forEach((link) => {
      if (!link) return;

      const handleMouseEnter = (e) => {
        gsap.to(link, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
        });

        // Animate the underline
        const underline = link.querySelector(".link-underline");
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = (e) => {
        gsap.to(link, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        // Reset underline
        const underline = link.querySelector(".link-underline");
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const handleMouseMove = (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic pull effect
        gsap.to(link, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
      link.addEventListener("mousemove", handleMouseMove);
    });
  });
  return (
    <nav className="fixed z-50 w-full top-0 px-8 py-6">
      <div className="flex justify-between">
        <div className="font-main text-2xl nav-title">Puneet Udhayan</div>
        <div className="flex flex-col font-inter font-thin gap-1">
          <a
            href="#blogs"
            ref={(el) => (linksRef.current[0] = el)}
            className="nav-link relative overflow-hidden cursor-pointer"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">BLOGS</span>
            <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
          </a>
          <a
            href="#art"
            ref={(el) => (linksRef.current[1] = el)}
            className="nav-link relative overflow-hidden cursor-pointer"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">ART</span>
            <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
          </a>
          <a
            href="#contact"
            ref={(el) => (linksRef.current[2] = el)}
            className="nav-link relative overflow-hidden cursor-pointer"
            style={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              const lenis = getLenis();
              const target = document.getElementById("contact");
              if (target) {
                const offset = target.offsetTop + window.innerHeight * 2;
                if (lenis) {
                  lenis.scrollTo(offset, { duration: 4 });
                } else {
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }
            }}
          >
            <span className="relative z-10">CONTACT</span>
            <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;

// Made with Bob
