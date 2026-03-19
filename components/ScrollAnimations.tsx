"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      revealElements.forEach((element) => {
        gsap.set(element, { autoAlpha: 1, y: 0 });
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    revealElements.forEach((element, index) => {
      const staggerDelay = (index % 8) * 0.02;
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: staggerDelay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            once: true,
          },
        },
      );
    });

    const parallaxElements = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const tiltElements = gsap.utils.toArray<HTMLElement>("[data-tilt]");
    const enableTilt = window.matchMedia("(min-width: 1024px)").matches;
    if (!enableTilt || tiltElements.length === 0) {
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    const onPointerMove = (event: PointerEvent) => {
      for (const element of tiltElements) {
        const rect = element.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          continue;
        }
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(element, {
          rotateX: y * -5,
          rotateY: x * 7,
          transformPerspective: 900,
          duration: 0.28,
          ease: "power2.out",
        });
      }
    };

    const onPointerLeave = () => {
      for (const element of tiltElements) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.42,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerLeave);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerLeave);
      window.removeEventListener("pointerleave", onPointerLeave);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
