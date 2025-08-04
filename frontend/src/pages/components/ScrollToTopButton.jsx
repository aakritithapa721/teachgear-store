import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // or replace with ↑ if you don’t use lucide-react

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
