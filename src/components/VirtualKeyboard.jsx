import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRef } from "react";

const VirtualKeyboard = ({
  isMobile,
  keyboardVisible,
  activeInputIndex,
  setLyricsInputs,
}) => {
  const audioCtxRef = useRef(null);
  const keyClickBufferRef = useRef(null); // Buffer para key-click.wav
  const backspaceBufferRef = useRef(null); // Buffer para backspace.wav

  if (!(isMobile && keyboardVisible)) return null;

  // Desbloqueio do contexto de áudio e carregamento de sons
  const unlockAudio = async () => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContext();

    try {
      // Carregar som de tecla padrão
      const keyClickRes = await fetch("/songs/sounds/key-click.wav");
      const keyClickArrayBuffer = await keyClickRes.arrayBuffer();
      keyClickBufferRef.current =
        await audioCtxRef.current.decodeAudioData(keyClickArrayBuffer);

      // Carregar som de backspace
      const backspaceRes = await fetch("/songs/sounds/backspace.wav");
      const backspaceArrayBuffer = await backspaceRes.arrayBuffer();
      backspaceBufferRef.current =
        await audioCtxRef.current.decodeAudioData(backspaceArrayBuffer);
    } catch (error) {
      console.error("Erro ao carregar sons:", error);
    }
  };

  // Função para tocar som genérico, depende do buffer
  const playSound = (buffer) => {
    if (!audioCtxRef.current || !buffer) return;

    const source = audioCtxRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtxRef.current.destination);
    source.start(0);
  };

  const handleKeyPress = (button) => {
    if (activeInputIndex === null) return;

    // Play som específico para cada tecla
    if (button === "{bksp}") {
      playSound(backspaceBufferRef.current); // Tocar som de backspace
    } else {
      playSound(keyClickBufferRef.current); // Tocar som padrão
    }

    // Atualizar estado dos inputs
    setLyricsInputs((prev) => {
      const updated = [...prev];

      if (button === "{bksp}") {
        updated[activeInputIndex] =
          updated[activeInputIndex]?.slice(0, -1) || "";
      } else {
        updated[activeInputIndex] = (updated[activeInputIndex] || "") + button;
      }

      return updated;
    });
  };

  return (
    <div className="mobile-keyboard" onPointerDown={unlockAudio}>
      <Keyboard
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M ' {bksp}",
          ],
        }}
        display={{
          "{bksp}": "back",
        }}
      />
    </div>
  );
};

export default VirtualKeyboard;
