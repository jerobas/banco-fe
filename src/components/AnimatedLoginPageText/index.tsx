import { useState, useEffect } from "react";
import { Styles } from "../../pages/Login/styles";

const AnimatedLoginPageText = () => {
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);

    const originalText = "Um jogo de tabuleiro diferente de todos os outros!";
    const typingSpeed = 100;

    useEffect(() => {
        let currentIndex = 0;
        let timerId: NodeJS.Timeout;
        const typeText = () => {
            setText(originalText.substring(0, currentIndex));
            currentIndex++;

            if (currentIndex <= originalText.length) {
                timerId = setTimeout(typeText, typingSpeed);
            }
            if (currentIndex === originalText.length) setProgress(100);
        };

        typeText();

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return <Styles.TypingText>
        {text}
        <Styles.Line progress={progress} />
    </Styles.TypingText>
}

export default AnimatedLoginPageText;