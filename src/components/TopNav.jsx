import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

function TopNav() {
  const linksRef = useRef([]);
  const drawerRef = useRef(null);
  const barTopRef = useRef(null);
  const barMidRef = useRef(null);
  const barBotRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/#contact");
      return;
    }
    const lenis = getLenis();
    // The drawer-open effect stops Lenis to lock background scroll; its
    // cleanup (which calls start()) hasn't run yet at this point in the
    // same click, and a stopped Lenis silently ignores scrollTo.
    lenis?.start();
    const target = document.getElementById("contact");
    if (target) {
      const offset = target.offsetTop + window.innerHeight * 2;
      if (lenis) {
        lenis.scrollTo(offset, { duration: 4 });
      } else {
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  // Keep the drawer from being stuck open behind a resize into desktop
  // width, and stop background scroll (Lenis handles wheel, but not
  // native touch scroll) while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    function onResize() {
      if (window.innerWidth >= 640) setMenuOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.3 },
      });

      if (menuOpen) {
        tl.set(drawerRef.current, { pointerEvents: "auto" })
          .to(drawerRef.current, { autoAlpha: 1, duration: 0.35 })
          .fromTo(
            ".drawer-link",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.1",
          )
          .to(barTopRef.current, { rotate: 45, y: 6 }, 0)
          .to(barMidRef.current, { opacity: 0 }, 0)
          .to(barBotRef.current, { rotate: -45, y: -6 }, 0);
      } else {
        tl.to(drawerRef.current, { autoAlpha: 0, duration: 0.25 })
          .set(drawerRef.current, { pointerEvents: "none" })
          .to(barTopRef.current, { rotate: 0, y: 0 }, 0)
          .to(barMidRef.current, { opacity: 1 }, 0)
          .to(barBotRef.current, { rotate: 0, y: 0 }, 0);
      }
    },
    { dependencies: [menuOpen] },
  );

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
      },
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
      },
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
      "<0.2",
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

  // The title's entrance above is tied to scrolling past the nav on the
  // home page. Other pages may not have enough scroll distance to ever
  // trigger that, so reveal it immediately whenever we're not on "/".
  useGSAP(
    () => {
      if (location.pathname === "/") return;
      gsap.to(".nav-title", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { dependencies: [location.pathname] },
  );

  return (
    <>
      <nav className="fixed z-50 w-full top-0 px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-main text-2xl nav-title cursor-pointer">
            Puneet Udhayan
          </Link>
          <div className="hidden sm:flex sm:flex-col font-inter font-thin gap-1">
            <Link
              to="/tech"
              ref={(el) => (linksRef.current[0] = el)}
              className="nav-link relative overflow-hidden cursor-pointer"
              style={{ opacity: 0 }}
            >
              <span className="relative z-10">TECH</span>
              <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
            </Link>
            <Link
              to="/art"
              ref={(el) => (linksRef.current[1] = el)}
              className="nav-link relative overflow-hidden cursor-pointer"
              style={{ opacity: 0 }}
            >
              <span className="relative z-10">ART</span>
              <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
            </Link>
            <a
              href="/#contact"
              ref={(el) => (linksRef.current[2] = el)}
              className="nav-link relative overflow-hidden cursor-pointer"
              style={{ opacity: 0 }}
              onClick={handleContactClick}
            >
              <span className="relative z-10">CONTACT</span>
              <span className="link-underline absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0"></span>
            </a>
          </div>

          <button
            type="button"
            className="sm:hidden relative z-[70] flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[5px] cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              ref={barTopRef}
              className="block h-[1.5px] w-6 bg-black"
              style={{ transformOrigin: "center" }}
            />
            <span
              ref={barMidRef}
              className="block h-[1.5px] w-6 bg-black"
              style={{ transformOrigin: "center" }}
            />
            <span
              ref={barBotRef}
              className="block h-[1.5px] w-6 bg-black"
              style={{ transformOrigin: "center" }}
            />
          </button>
        </div>
      </nav>

      {/* Rendered outside <nav> on purpose: nav's scroll-triggered
          backdrop-filter animation would otherwise establish a new CSS
          containing block, trapping this fixed-position overlay inside
          nav's own (much smaller) box instead of covering the viewport. */}
      <div
        ref={drawerRef}
        className="invisible fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-[#fdfdfc] opacity-0 sm:hidden"
      >
        <Link
          to="/tech"
          className="drawer-link font-inter text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          TECH
        </Link>
        <Link
          to="/art"
          className="drawer-link font-inter text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          ART
        </Link>
        <a
          href="/#contact"
          className="drawer-link font-inter text-3xl"
          onClick={handleContactClick}
        >
          CONTACT
        </a>
      </div>
    </>
  );
}

export default TopNav;

// Made with Bob
