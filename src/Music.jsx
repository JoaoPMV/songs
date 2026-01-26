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
                      ? "correct-word" // Fundo verde para palavras corretas
                      : "wrong-word" // Fundo vermelho para palavras incorretas
                    : ""
                }`}
                inputMode={isMobile ? "none" : "text"} // Permite edição padrão em desktops
                readOnly={isMobile} // Apenas leitura para dispositivos móveis
                onChange={(e) => {
                  // Atualiza o estado lyricsInputs para permitir digitação diretamente via teclado físico
                  const newInputs = [...lyricsInputs];
                  newInputs[currentInputIndex] = e.target.value;
                  setLyricsInputs(newInputs);
                }}
                onFocus={() => {
                  // Atualiza o índice do input ativo sem mudar o estilo
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
        <p>Imagine Dragons - Demons</p>

        <audio
          ref={audioRef}
          controls
          className="audio-player-music"
          controlsList="nodownload noplaybackrate nofullscreen"
        >
          <source
            src={`${import.meta.env.BASE_URL}songs/demons.mp3`}
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
