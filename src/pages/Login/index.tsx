import { useActionState } from "react";

import Layout from "../../components/Layout";
import { Styles, buttonVariants } from "./styles";
import AnimatedLoginPageText from "../../components/AnimatedLoginPageText";
import { useHandleLogin } from "../../hooks/useHandleLogin";

export default function Login() {
  const handleLogin = useHandleLogin()
  const [error, formAction, isPending] = useActionState(handleLogin, false)

  //falta o toastify

  return (
    <Layout>
      <Styles.Container>
        <Styles.Content>
          <AnimatedLoginPageText />
          <div>
            <form>
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder={"Seu nome"}
                style={{
                  outlineColor: error ? "#861515" : undefined,
                }}
                disabled={isPending}
              />
              <Styles.StyledButton
                variants={buttonVariants}
                whileHover="hover"
                disabled={isPending}
                formAction={formAction}
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
