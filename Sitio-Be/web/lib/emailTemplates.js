// Branded email templates for Be Management
// Inline CSS only — many clients strip <style>.

const ACCENT_START = "#FF4500";
const ACCENT_END = "#FF8C00";
const BLACK = "#080808";
const BRAND_NAME = "Be Management";
const BRAND_URL = "https://bemanagement.pro";
const INSTAGRAM = "https://instagram.com/bemanagement.pro";
const WHATSAPP = "https://api.whatsapp.com/send/?phone=5492216925774";
const LOGO_URL = `${BRAND_URL}/assets/Logo.png`; // público en el sitio

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell({ title, bodyInner, preheader }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="x-apple-disable-message-reformatting"/>
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:${BLACK};">
  <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${esc(preheader || "")}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <tr>
            <td style="background:${BLACK};padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="40" height="40" style="display:block;border:0;outline:none;text-decoration:none;height:40px;width:40px;object-fit:contain;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-size:11px;letter-spacing:0.22em;font-weight:700;text-transform:uppercase;color:#ffffff;">Be · Management</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,${ACCENT_START},${ACCENT_END});line-height:3px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:40px 32px 32px 32px;">
              ${bodyInner}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 28px 32px;background:#fafafa;border-top:1px solid #eeeeee;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px;color:#888;line-height:1.6;">
                    <strong style="color:${BLACK};">${BRAND_NAME}</strong> — La Plata, Buenos Aires<br/>
                    <a href="${BRAND_URL}" style="color:#FF6A00;text-decoration:none;">bemanagement.pro</a>
                    &nbsp;·&nbsp;
                    <a href="${INSTAGRAM}" style="color:#FF6A00;text-decoration:none;">Instagram</a>
                    &nbsp;·&nbsp;
                    <a href="${WHATSAPP}" style="color:#FF6A00;text-decoration:none;">WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="font-size:11px;color:#999;margin:16px 0 0 0;">© ${new Date().getFullYear()} ${BRAND_NAME}. Todos los derechos reservados.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function internalEmail({ nombre, apellido, email, telefono, mensaje }) {
  const fullName = `${nombre} ${apellido}`.trim();
  const row = (label, value) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#999;width:110px;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:${BLACK};font-weight:600;vertical-align:top;">${value}</td>
    </tr>`;

  const bodyInner = `
    <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#999;font-weight:700;">Nuevo Contacto</p>
    <h1 style="margin:0 0 24px 0;font-size:26px;line-height:1.2;color:${BLACK};font-weight:800;">
      Llegó un mensaje desde <span style="background:linear-gradient(90deg,${ACCENT_START},${ACCENT_END});-webkit-background-clip:text;background-clip:text;color:transparent;">bemanagement.pro</span>
    </h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px 0;">
      ${row("Nombre", esc(fullName))}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:#FF6A00;text-decoration:none;">${esc(email)}</a>`)}
      ${row("Teléfono", telefono ? `<a href="tel:${esc(telefono)}" style="color:#FF6A00;text-decoration:none;">${esc(telefono)}</a>` : "<span style=\"color:#bbb;font-weight:400;\">—</span>")}
    </table>
    <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#999;font-weight:700;">Mensaje</p>
    <div style="background:#fafafa;border-left:3px solid ${ACCENT_START};padding:18px 20px;border-radius:4px;">
      <p style="margin:0;font-size:15px;line-height:1.65;color:#333;white-space:pre-wrap;">${esc(mensaje)}</p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0 0;">
      <tr>
        <td style="background:linear-gradient(90deg,${ACCENT_START},${ACCENT_END});border-radius:4px;">
          <a href="mailto:${esc(email)}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;">Responder →</a>
        </td>
      </tr>
    </table>
  `;

  const text = [
    `Nuevo mensaje desde bemanagement.pro`,
    ``,
    `Nombre: ${fullName}`,
    `Email: ${email}`,
    `Teléfono: ${telefono || "—"}`,
    ``,
    `Mensaje:`,
    mensaje,
    ``,
    `— Be Management`,
  ].join("\n");

  return {
    subject: `Nuevo contacto web — ${fullName}`,
    html: shell({
      title: "Nuevo contacto",
      preheader: `${fullName} te escribió desde bemanagement.pro`,
      bodyInner,
    }),
    text,
  };
}

export function confirmationEmail({ nombre }) {
  const first = (nombre || "").split(/\s+/)[0] || "Hola";
  const bodyInner = `
    <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#999;font-weight:700;">Recibido</p>
    <h1 style="margin:0 0 16px 0;font-size:28px;line-height:1.2;color:${BLACK};font-weight:800;">
      ¡Gracias, <span style="background:linear-gradient(90deg,${ACCENT_START},${ACCENT_END});-webkit-background-clip:text;background-clip:text;color:transparent;">${esc(first)}</span>!
    </h1>
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#444;">
      Recibimos tu mensaje. Un miembro del equipo te va a responder dentro de las próximas 24 h hábiles para coordinar una primera consulta sin costo.
    </p>
    <p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#444;">
      Mientras tanto podés conocer más sobre lo que hacemos o escribirnos directo por WhatsApp.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px 0;">
      <tr>
        <td style="background:linear-gradient(90deg,${ACCENT_START},${ACCENT_END});border-radius:4px;padding:0;">
          <a href="${BRAND_URL}/proyectos" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;">Ver proyectos →</a>
        </td>
        <td style="width:12px;">&nbsp;</td>
        <td style="border:2px solid ${ACCENT_START};border-radius:4px;">
          <a href="${WHATSAPP}" style="display:inline-block;padding:12px 26px;color:${ACCENT_START};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;">WhatsApp</a>
        </td>
      </tr>
    </table>
    <p style="margin:28px 0 0 0;font-size:13px;line-height:1.6;color:#888;">
      — El equipo de <strong style="color:${BLACK};">${BRAND_NAME}</strong>
    </p>
  `;

  const text = [
    `¡Gracias, ${first}!`,
    ``,
    `Recibimos tu mensaje. Un miembro del equipo te va a responder dentro de las próximas 24 h hábiles para coordinar una primera consulta sin costo.`,
    ``,
    `Proyectos: ${BRAND_URL}/proyectos`,
    `WhatsApp: ${WHATSAPP}`,
    ``,
    `— El equipo de ${BRAND_NAME}`,
  ].join("\n");

  return {
    subject: `Recibimos tu mensaje — ${BRAND_NAME}`,
    html: shell({
      title: "Recibimos tu mensaje",
      preheader: "Gracias por escribirnos. Te respondemos en menos de 24 h hábiles.",
      bodyInner,
    }),
    text,
  };
}
