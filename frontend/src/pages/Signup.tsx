import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { AuthForm } from "../components/auth/AuthForm";
import { ApiError } from "../lib/apiClient";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signup = useSignup();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signup.mutate(
      { username, password },
      { onSuccess: () => navigate("/signin") } // signup doesn't set a cookie, so send them to sign in next
    );
  }

  const error = signup.error instanceof ApiError ? signup.error.message : undefined;

  return (
    <AuthForm
      title="Create your account"
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      submitLabel="Sign up"
      isPending={signup.isPending}
      error={error}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="text-[var(--color-accent)] hover:underline">
            Sign in
          </Link>
        </>
      }
    />
  );
}