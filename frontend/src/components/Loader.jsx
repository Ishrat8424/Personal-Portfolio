import { useEffect, useRef, useState } from "react";
import "./Loader.css";

const words = ["Welcome", "to", "My","Portfolio"];

function Loader() {
  const [visibleWords, setVisibleWords] = useState([]);
  const [showName, setShowName] = useState(false);
  const [typedName, setTypedName] = useState("");

  const started = useRef(false);

  const fullName = "Ishrat Jahan Khazi";

  // Show welcome sentence word by word
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    words.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords((prev) => [...prev, word]);
      }, index * 600);
    });

    // After welcome animation
    setTimeout(() => {
      setShowName(true);
    }, words.length * 600 + 800);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!showName) return;

    let i = 0;

    const typing = setInterval(() => {
      setTypedName(fullName.slice(0, i + 1));
      i++;

      if (i === fullName.length) {
        clearInterval(typing);
      }
    }, 120);

    return () => clearInterval(typing);
  }, [showName]);

  return (
    <div className="loader">
      {!showName ? (
        <div className="welcome">
          {visibleWords.map((word, index) => (
            <span
              key={index}
              className="word"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {word}
            </span>
          ))}
        </div>
      ) : (
        <h1 className="typing">
          {typedName}
          <span className="cursor">|</span>
        </h1>
      )}
    </div>
  );
}

export default Loader;