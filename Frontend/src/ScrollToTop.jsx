import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait for the animation to finish and then scroll to the top
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500); // Adjust the delay if needed

    return () => clearTimeout(timeout); // Clear timeout on cleanup
  }, [pathname]);

  return null;
};

export default ScrollToTop;