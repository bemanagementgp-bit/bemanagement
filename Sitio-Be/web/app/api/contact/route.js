import { Resend } from "resend";
import { internalEmail, confirmationEmail } from "@/lib/emailTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Idealmente un dominio verificado en Resend, ej: "Be Management <hola@bemanagement.pro>"
const FROM = process.env.RESEND_FROM || "Be Management <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || "bemanagementgp@gmail.com";
// Solo activar cuando FROM sea de dominio verificado (Resend bloquea enviar al público desde onboarding@resend.dev)
const SEND_CONFIRMATION = (process.env.SEND_CONFIRMATION || "false").toLowerCase() === "true";

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { ok: false, error: "Servidor no configurado: falta RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const nombre = (body.nombre || "").toString().trim();
    const apellido = (body.apellido || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const telefono = (body.telefono || "").toString().trim();
    const mensaje = (body.mensaje || "").toString().trim();

    if (!nombre || !apellido || !email || !mensaje) {
      return Response.json({ ok: false, error: "Faltan campos obligatorios." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Email inválido." }, { status: 400 });
    }
    if (
      nombre.length > 100 || apellido.length > 100 || email.length > 200 ||
      telefono.length > 40 || mensaje.length > 5000
    ) {
      return Response.json({ ok: false, error: "Datos demasiado extensos." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = { nombre, apellido, email, telefono, mensaje };
    const internal = internalEmail(payload);

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
      headers: { "X-Entity-Ref-ID": `contact-${Date.now()}` },
    });

    if (error) {
      return Response.json({ ok: false, error: error.message || "No se pudo enviar." }, { status: 502 });
    }

    if (SEND_CONFIRMATION) {
      const confirm = confirmationEmail(payload);
      resend.emails
        .send({
          from: FROM,
          to: email,
          replyTo: TO,
          subject: confirm.subject,
          html: confirm.html,
          text: confirm.text,
        })
        .catch(() => {});
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (err) {
    return Response.json({ ok: false, error: "Error inesperado." }, { status: 500 });
  }
}

