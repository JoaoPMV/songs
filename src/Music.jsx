import React, { useState, useRef } from "react";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Navbar from "./components/Navbar";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "./index.css";

const Music = () => {
  const [showLyrics, setShowLyrics] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );
  const audioRef = useRef(null);

  React.useEffect(() => {
    console.log("isMobile changed:", isMobile);
  }, [isMobile]);

  // Verifica mudanças em activeInputIndex
  React.useEffect(() => {
    console.log("activeInputIndex changed:", activeInputIndex);
  }, [activeInputIndex]);

  React.useEffect(() => {
    if (isMobile && showLyrics) {
      setActiveInputIndex(0);
    }
  }, [isMobile, showLyrics]);

  // lyricsText formatado como um array
  const lyricsText = [
    "It {starts} with one",
    "One thing, I {don't} know why",
    "It doesn't {even} matter",
    "how {hard} you try",
    "Keep that in {mind}",
    "I {designed} this rhyme",
    "To {explain} in due time (all I know)",
    "Time is a {valuable} thing",
    "Watch it fly by as the pendulum {swings}",
    "Watch it count {down}",
    "To the end of the day",
    "The {clock} ticks life away",
    "it's so {unreal}",
    "You {didn't} look out below",
    "Watch the time go",
    "Right out the {window}",
    "{Trying} to hold on",
    "To didn't even know",
    "I {wasted} it all just to watch you go",
    "I {kept} everything inside",
    "And even {though} I tried",
    "it all fell {apart}",
    "What it meant to me will {eventually}",
    "Be a {memory} of a time when",
    "I tried so {hard} and got so far",
    "But in the end, it doesn't even {matter}",
    "I {had} to fall to lose it all",
    "But in the end, it doesn't even {matter}",
    "One thing, I {don't} know why",
    "It doesn't {even} matter how hard you try",
    "Keep that in {mind}",
    "I {designed} this rhyme",
    "To {remind} myself",
    "how I {tried} so hard",
    "In {spite} of the way",
    "You were mocking me",
    "Acting like I was part of your {property}",
    "{Remembering} all the times you fought with me",
    "I'm {surprised} it got so far (got so far)",
    "Things {aren't} the way they were before",
    "You {wouldn't} even recognize me anymore",
    "Not that you knew me {back} then",
    "But it all {comes} back to me (in the end)",
    "You {kept} everything inside",
    "And even {though} I tried, it all fell apart",
    "What it meant to me will {eventually}",
    "Be a {memory} of a time when",
    "I tried so {hard} and got so far",
    "But in the end, it doesn't even {matter}",
    "I {had} to fall to lose it all",
    "But in the end, it doesn't even {matter}",
    "I've put my {trust} in you",
    "Pushed as {far} as I can go",
    "For all {this}",
    "{There's} only one thing you should know",
    "I've put my {trust} in you",
    "Pushed as {far} as I can go",
    "For all {this}",
    "{There's} only one thing you should know",
    "I tried so {hard} and got so far",
    "But in the end, it doesn't even {matter}",
    "I {had} to fall to lose it all",
    "But in the end, it doesn't even {matter}",
  ];

  // Remove duplicatas, extraindo palavras únicas entre {}
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
                className={`lyrics-input ${
                  lyricsInputs[currentInputIndex]?.length > 0
                    ? lyricsInputs[currentInputIndex].toLowerCase() ===
                      cleanWord.toLowerCase()
                      ? "correct-word"
                      : "wrong-word"
                    : ""
                }`}
                inputMode={isMobile ? "none" : "text"} // Permite edição padrão em desktops
                readOnly={isMobile} // readOnly só para dispositivos móveis
                onChange={(e) => {
                  // Atualiza o estado lyricsInputs para permitir digitação diretamente via teclado físico
                  const newInputs = [...lyricsInputs];
                  newInputs[currentInputIndex] = e.target.value;
                  setLyricsInputs(newInputs);
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

  const forward10 = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10,
    );
  };

  const back10 = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10,
    );
  };

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileNow);
      setKeyboardVisible(isMobileNow);
    };

    // Otimiza os eventos de resize com debounce
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200); // Debounce de 200ms
    };

    // Atualiza o estado no momento da montagem
    handleResize();

    // Adiciona o listener com debounce
    window.addEventListener("resize", debouncedResize);

    return () => {
      // Remove o listener ao desmontar o componente
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
        <p>Link Park - In the End</p>

        <audio
          ref={audioRef}
          controls
          className="audio-player-music"
          controlsList="nodownload noplaybackrate nofullscreen"
        >
          <source
            src={`${import.meta.env.BASE_URL}songs/intheend.mp3`}
            type="audio/mpeg"
          />
        </audio>

        <div className="left-and-right">
          <FaCaretSquareLeft
            className="left-button"
            style={{ cursor: "pointer", fontSize: "24px" }}
            onClick={back10}
          />
          <p>10 Seconds</p>
          <FaCaretSquareRight
            className="left-button"
            style={{ cursor: "pointer", fontSize: "24px" }}
            onClick={forward10}
          />
        </div>

        <div className="buttons-music">
          <button
            className={showLyrics ? "active" : ""}
            onClick={() => {
              setShowLyrics(!showLyrics);
              setShowVocabulary(false);
            }}
          >
            Lyrics
          </button>

          <button
            className={showVocabulary ? "active" : ""}
            onClick={() => {
              setShowVocabulary(!showVocabulary);
              setShowLyrics(false);
            }}
          >
            Vocabulary
          </button>
        </div>
      </section>
      <main className="main-music">
        {showLyrics && (
          <div className="lyrics-music">{renderLyrics(lyricsText)}</div>
        )}

        {showVocabulary && (
          <div className="vocabulary-box">
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
        keyboardVisible={keyboardVisible} // <-- AQUI!
        activeInputIndex={activeInputIndex}
        setLyricsInputs={setLyricsInputs}
      />
    </div>
  );
};

export default Music;
