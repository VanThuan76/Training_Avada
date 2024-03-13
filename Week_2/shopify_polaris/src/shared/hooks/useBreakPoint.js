import { breakpoints } from '@avada/core/config';
import { useEffect, useState } from 'react';

const useBreakPoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      const breakpoint = Object.keys(breakpoints)
        .reverse()
        .find(key => window.innerWidth >= breakpoints[key]);

      setCurrentBreakpoint(breakpoint || 'sm');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentBreakpoint;
};

export default useBreakPoint;
