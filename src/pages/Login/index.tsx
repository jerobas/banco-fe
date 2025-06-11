import { useActionState } from 'react';

import { useHandleLogin } from '../../hooks/useHandleLogin';

export default function Login() {
  const handleLogin = useHandleLogin();
  const [error, formAction, isPending] = useActionState(handleLogin, false);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-cyan-400">Bem-vindo ao Lopoly!</h1>

      <form className="flex flex-col gap-6 w-full max-w-sm" action={formAction}>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder={error ? "O nome é necessário" : "Seu nome"}
          disabled={isPending}
          className={`px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 border ${
            error ? "border-red-700" : "border-transparent"
          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 text-white py-3 rounded-md font-semibold disabled:opacity-50"
        >
          Fazer login!
        </button>
      </form>
    </div>
  );
}
