import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCsrf } from "../utils/csrf";

/* TODO: Warnung falls Nutzer schon existiert */

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  const calcStrength = (pw) => {
    let score = 0;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "password") setStrength(calcStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password2) {
      setError("Passwörter stimmen nicht überein");
      return;
    }
    if (strength < 3) {
      setError("Passwort ist zu schwach");
      return;
    }

    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrf(),
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Registrierung fehlgeschlagen");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"][strength];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              autoComplete="new-password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$"
              title="Mind. 12 Zeichen, Groß-/Klein­buchstaben, Zahl & Sonderzeichen"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="h-2 w-full bg-gray-200 rounded">
              <div className={`h-full rounded ${strengthColor}`} style={{ width: `${(strength / 4) * 100}%` }} />
            </div>
            <input
              name="password2"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              autoComplete="new-password"
              value={form.password2}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-full" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
