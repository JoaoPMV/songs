import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualKeyboard = ({
  isMobile,
  keyboardVisible, // <- adicione essa prop aqui também
  activeInputIndex,
  setLyricsInputs,
}) => {
  // ✅ PRIMEIRA LINHA: early return para não renderizar o componente
  if (!(isMobile && keyboardVisible)) return null;

  const handleKeyPress = (button) => {
    if (activeInputIndex === null) return;

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
    <div className="mobile-keyboard">
      <Keyboard
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M {bksp}",
          ],
        }}
      />
    </div>
  );
};

export default VirtualKeyboard;
