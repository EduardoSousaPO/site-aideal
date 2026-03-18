"use client";

import { FormEvent, useState } from "react";

type FormStatus =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Enviando mensagem..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { success: boolean; message: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Falha ao enviar formulário.");
      }

      setStatus({ type: "success", message: result.message });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível enviar no momento.";
      setStatus({ type: "error", message });
    }
  };

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
        required
      />

      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={(event) =>
          setFormData((current) => ({ ...current, email: event.target.value }))
        }
        required
      />

      <label htmlFor="phone">Telefone</label>
      <input
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={(event) =>
          setFormData((current) => ({ ...current, phone: event.target.value }))
        }
      />

      <label htmlFor="message">Mensagem</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={(event) =>
          setFormData((current) => ({ ...current, message: event.target.value }))
        }
        required
      />

      {status.type === "error" ? (
        <div className="status-message error">{status.message}</div>
      ) : null}
      {status.type === "success" ? (
        <div className="status-message success">{status.message}</div>
      ) : null}

      <button className="btn-primary" disabled={status.type === "loading"} type="submit">
        {status.type === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
