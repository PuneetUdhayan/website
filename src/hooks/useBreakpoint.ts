// src/hooks/useBreakpoint.js
import { useState, useEffect } from 'react';
import { breakpoints } from '../utils/breakpoints'; // Adjust path as needed

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('2xl'); // Default to largest or a sensible initial value

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let currentBreakpoint = '2xl'; // Default or a sensible fallback

      if (width >= breakpoints['2xl']) {
        currentBreakpoint = '2xl';
      } else if (width >= breakpoints.xl) {
        currentBreakpoint = 'xl';
      } else if (width >= breakpoints.lg) {
        currentBreakpoint = 'lg';
      } else if (width >= breakpoints.md) {
        currentBreakpoint = 'md';
      } else if (width >= breakpoints.sm) {
        currentBreakpoint = 'sm';
      } else {
        currentBreakpoint = 'xs'; // Or 'base', or handle smaller screens as needed
      }
      setBreakpoint(currentBreakpoint);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return breakpoint;
};