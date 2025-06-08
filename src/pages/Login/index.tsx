import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../api/index";
import Layout from "../../components/Layout";
import { saveUserInStorage } from "../../services/Auth";
import { Styles, buttonVariants } from "./styles";

export default function Login() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome é obrigatório!");
      return;
    }
    try {
      const response = await ApiService.post("/users", { name });
      if (response.status === 201) {
        saveUserInStorage(JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      setError("Erro ao fazer login.");
    }
  };

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <Styles.TypingText>
            {text}
            <Styles.Line progress={progress} />
          </Styles.TypingText>

          <div>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                autoComplete="off"
                id="input"
                placeholder={error || "Seu nome"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                style={{
                  outlineColor: error ? "#861515" : undefined,
                }}
              />
              <Styles.StyledButton
                variants={buttonVariants}
                whileHover="hover"
                onClick={() => { }}
              >
                Fazer login!
              </Styles.StyledButton>
            </form>
          </div>
        </Styles.Content>
      </Styles.Container>
    </Layout>
  );
}
