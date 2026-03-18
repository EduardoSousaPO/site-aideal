import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(payload: ContactPayload) {
  if (!payload.name || payload.name.trim().length < 2) {
    return "Informe um nome válido.";
  }

  if (!emailRegex.test(payload.email ?? "")) {
    return "Informe um e-mail válido.";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    return "A mensagem deve ter pelo menos 10 caracteres.";
  }

  return null;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Corpo da requisição inválido.",
      },
      { status: 400 },
    );
  }

  const errorMessage = validatePayload(payload);
  if (errorMessage) {
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Integração com banco indisponível. Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() ?? null,
    message: payload.message.trim(),
    source: "website-nextjs",
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível salvar o contato no momento.",
        detail: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Mensagem enviada com sucesso. Em breve entraremos em contato.",
  });
}
