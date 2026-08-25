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
      }, index * 400);
    });

    // After welcome animation
    setTimeout(() => {
      setShowName(true);
    }, words.length * 400 + 400);
  }, []);

  // Typing + Erasing Animation
useEffect(() => {
  if (!showName) return;

  let index = 0;
  let deleting = false;

  const interval = setInterval(() => {
    if (!deleting) {
      // Typing
      setTypedName(fullName.slice(0, index + 1));
      index++;

      if (index === fullName.length) {
        deleting = true;

        // Pause before erasing
        clearInterval(interval);

        setTimeout(() => {
          let deleteIndex = fullName.length;

          const eraseInterval = setInterval(() => {
            deleteIndex--;
            setTypedName(fullName.slice(0, deleteIndex));

            if (deleteIndex === 0) {
              clearInterval(eraseInterval);
            }
          }, 70); // Erasing speed
        }, 500); // Pause before erasing
      }
    }
  }, 80);

  return () => clearInterval(interval);
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