export function getCsrf() {
  const token = document.cookie
    .split("; ")
    .find((c) => c.startsWith("csrftoken="))
    ?.split("=")[1];

  if (!token) {
    console.warn("Kein CSRF-Token im Cookie gefunden.");
    throw new Error("CSRF-Token fehlt");
  }

  return token;
}
