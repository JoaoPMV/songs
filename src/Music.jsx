import React, { useState, useRef } from "react";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Navbar from "./components/Navbar";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Audioplayer from "./components/Audioplayer";
import "./index.css";

const Music = () => {
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  const audioPlayerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const inputsRef = useRef([]);

  // 🔥 ADIÇÃO
  const isAutoFocusing = useRef(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      setShowVocabulary(true);
    } else {
      setShowVocabulary(false);
    }
  };

  React.useEffect(() => {
    console.log("isMobile changed:", isMobile);
  }, [isMobile]);

  React.useEffect(() => {
    console.log("activeInputIndex changed:", activeInputIndex);
  }, [activeInputIndex]);

  React.useEffect(() => {
    if (isMobile && !showVocabulary) {
      setActiveInputIndex(0);
    }
  }, [isMobile, showVocabulary]);

  const lyricsText = [
    "When the days are {cold}",
    "And the cards all {fold}",
    "And the {saints} we see",
    "Are all {made} of gold",

    "When your dreams all {fail}",
    "And the ones we {hail}",
    "Are the {worst} of all",
    "And the blood's run {stale}",

    "I wanna {hide} the truth",
    "I wanna {shelter} you",
    "But with the {beast} inside",
    "There's {nowhere} we can hide",

    "No matter what we {breed}",
    "We still are made of {greed}",
    "This is my {kingdom} come",
    "This is my {kingdom} come",

    "When you feel my {heat}",
    "Look {into} my eyes",
    "It's where my demons {hide}",
    "It's where my demons {hide}",
    "Don't get too {close}",
    "It's dark {inside}",
    "It's where my demons {hide}",
    "It's where my demons {hide}",

    "At the curtain's {call}",
    "Is the {last} of all",
    "When the lights {fade} out",
    "All the {sinners} crawl",
    "So they {dug} your grave",
    "And the {masquerade}",
    "Will come {calling} out",
    "At the {mess} you made",

    "Don't wanna let you {down}",
    "But I am hell {bound}",
    "{Though} this is all for you",
    "Don't wanna hide the {truth}",

    "No matter what we {breed}",
    "We still are made of {greed}",
    "This is my {kingdom} come",
    "This is my {kingdom} come",

    "When you feel my {heat}",
    "Look {into} my eyes",
    "It's where my demons {hide}",
    "It's where my demons {hide}",
    "Don't get too {close}",
    "It's dark {inside}",
    "It's where my demons {hide}",
    "It's where my demons {hide}",

    "They say it's what you {make}",
    "I say it's up to {fate}",
    "It's {woven} in my {soul}",
    "I {need} to let you go",
    "Your eyes, they shine so {bright}",
    "I wanna save that {light}",
    "I can't {escape} this now",
    "{Unless} you show me how",

    "When you feel my {heat}",
    "Look {into} my eyes",
    "It's where my demons {hide}",
    "It's where my demons {hide}",
    "Don't get too {close}",
    "It's dark {inside}",
    "It's where my demons {hide}",
    "It's where my demons {hide}",
  ];

  const vocabularyWords = [
    ...new Set(
      lyricsText
        .join(" ")
        .match(/\{(.*?)\}/g)
        ?.map((m) => m.replace(/[{}]/g, "").toLowerCase()) || [],
    ),
  ];

  const [lyricsInputs, setLyricsInputs] = useState(() =>
    vocabularyWords.map(() => ""),
  );

  const renderLyrics = (lyrics) => {
    let inputCounter = 0;

    return lyrics.map((line, i) => (
      <div key={`line-${i}`} className="lyrics-line">
        {line.split(" ").map((word, index) => {
          const trimmedWord = word.trim().replace(/[.,!?:;]$/, "");
          if (trimmedWord.startsWith("{") && trimmedWord.endsWith("}")) {
            const cleanWord = trimmedWord.slice(1, -1);

            const currentInputIndex = inputCounter;
            inputCounter++;

            return (
              <input
                key={`input-${i}-${index}-${cleanWord}`}
                ref={(el) => (inputsRef.current[currentInputIndex] = el)}
                className={`lyrics-input ${
                  lyricsInputs[currentInputIndex]?.length > 0
                    ? lyricsInputs[currentInputIndex].toLowerCase() ===
                      cleanWord.toLowerCase()
                      ? "correct-word"
                      : "wrong-word"
                    : ""
                }`}
                inputMode={isMobile ? "none" : "text"}
                readOnly={isMobile}
                onChange={(e) => {
                  const newInputs = [...lyricsInputs];
                  newInputs[currentInputIndex] = e.target.value;
                  setLyricsInputs(newInputs);
                }}
                onFocus={() => {
                  setActiveInputIndex(currentInputIndex);
                }}
                value={lyricsInputs[currentInputIndex] || ""}
              />
            );
          }

          return (
            <span key={`word-${i}-${index}`} className="lyrics-word">
              {word + " "}
            </span>
          );
        })}
      </div>
    ));
  };

  // 🔥 SUBSTITUÍDO (auto-focus com lock anti-loop)
  React.useEffect(() => {
    if (activeInputIndex === null) return;
    if (isAutoFocusing.current) return;

    const currentValue = lyricsInputs[activeInputIndex];
    const correctWord = vocabularyWords[activeInputIndex];

    if (
      currentValue &&
      correctWord &&
      currentValue.toLowerCase() === correctWord.toLowerCase()
    ) {
      const nextIndex = activeInputIndex + 1;

      if (inputsRef.current[nextIndex]) {
        isAutoFocusing.current = true;

        inputsRef.current[nextIndex].focus();
        setActiveInputIndex(nextIndex);

        setTimeout(() => {
          isAutoFocusing.current = false;
        }, 50);
      }
    }
  }, [lyricsInputs, activeInputIndex]);

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileNow);
      setKeyboardVisible(isMobileNow);
    };

    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };

    handleResize();
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <div className="grid-container-music">
      <div className="background-blur"></div>
      <header className="header-music">
        <Navbar></Navbar>
      </header>
      <section className="section-music">
        <p>Imagine Dragons - Demons</p>

        <Audioplayer ref={audioPlayerRef} />
        <button
          className="button-vocabulary"
          onClick={() => setShowVocabulary((prev) => !prev)}
        >
          {showVocabulary ? "Lyrics" : "Vocabulary"}
        </button>
      </section>

      <main className="main-music">
        {!showVocabulary && (
          <div
            className="lyrics-music"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {renderLyrics(lyricsText)}
          </div>
        )}
        {showVocabulary && (
          <div
            className="vocabulary-box"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {vocabularyWords.map((w, i) => (
              <div className="vocabulary-words" key={i}>
                {w}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer-music">
        <a href="https://github.com/JoaoPMV">
          <div className="dev-info">
            <FaGithub className="git-icon" />
            <p className="">JoãoP Dev</p>
          </div>
        </a>
      </footer>

      <VirtualKeyboard
        isMobile={isMobile}
        keyboardVisible={keyboardVisible}
        activeInputIndex={activeInputIndex}
        setLyricsInputs={setLyricsInputs}
      />
    </div>
  );
};

export default Music;
