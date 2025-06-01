import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [csrfReady, setCsrfReady] = useState(false);

  useEffect(() => {
    fetch("/api/csrf/", { credentials: "include" })
      .then(() => setCsrfReady(true))
      .catch(() => {
        console.warn("CSRF konnte nicht gesetzt werden.");
        setErr("CSRF-Token fehlt – Seite neu laden");
      });
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
    } catch {
      setErr("Login fehlgeschlagen");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="card w-full max-w-md bg-white shadow-lg">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Login
          </h2>

          {err && (
            <p className="text-red-500 text-sm text-center mb-4">{err}</p>
          )}

          <form
            onSubmit={submit}
            className={`space-y-4 ${!csrfReady ? "opacity-50 pointer-events-none" : ""}`}
          >
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              value={form.username}
              onChange={onChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={onChange}
              required
            />
            <button className="btn btn-primary w-full" type="submit" disabled={!csrfReady}>
              {csrfReady ? "Login" : "Warte auf Sicherheitstoken..."}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Noch kein Account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary font-medium hover:underline"
              >
                Jetzt registrieren
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
