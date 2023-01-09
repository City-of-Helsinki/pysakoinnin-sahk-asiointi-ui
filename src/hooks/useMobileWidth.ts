import { useEffect, useState } from 'react';

const useMobileWidth = () => {
  const BREAKPOINT_M = 768;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth <= BREAKPOINT_M;
};

export default useMobileWidth;
