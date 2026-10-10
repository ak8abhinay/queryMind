import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";
import { AuthForm } from "../components/auth/AuthForm";
import { ApiError } from "../lib/apiClient";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signin = useSignin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signin.mutate(
      { username, password },
      { onSuccess: () => navigate("/") }
    );
  }

  const error = signin.error instanceof ApiError ? signin.error.message : undefined;

  return (
    <AuthForm
      title="Sign in to QueryMind"
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      submitLabel="Sign in"
      isPending={signin.isPending}
      error={error}
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-[var(--color-accent)] hover:underline">
            Sign up
          </Link>
        </>
      }
    />
  );
}