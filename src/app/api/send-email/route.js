/**
 * route.js — Next.js App Router API Route
 * POST /api/send-email
 *
 * ─── SECURITY ─────────────────────────────────────────────────────
 * This file runs ONLY on the server (Node.js runtime).
 * process.env.BREVO_API_KEY is NEVER exposed to the browser.
 * No "use client" — this is a server-side route handler.
 * ─────────────────────────────────────────────────────────────────
 *
 * Expected request body (JSON):
 *   formType  — "appointment" | "contact"
 *   name      — required
 *   phone     — required
 *   email     — optional, validated if present
 *   service   — optional
 *   date      — optional (appointment only)
 *   time      — optional (appointment only)
 *   message   — optional
 */

import { NextResponse } from "next/server";

/* ── Brevo SMTP API endpoint ───────────────────────────────────── */
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/* ── Server-side validation ────────────────────────────────────── */
function validateBody(body) {
  const errors = {};

  if (!body.name || !String(body.name).trim()) {
    errors.name = "Name is required.";
  }
  if (!body.phone || !String(body.phone).trim()) {
    errors.phone = "Phone number is required.";
  }
  if (body.email && body.email.trim()) {
    /* Email is optional, but validate format if provided */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      errors.email = "Invalid email address.";
    }
  }

  return errors;
}

/* ── Build user confirmation email HTML ────────────────────────── */
function buildUserConfirmationHtml(data) {
  const { formType, name } = data;
  const isAppointment = formType === "appointment";
  const accentColor   = "#C8A96E";
  const darkColor     = "#222222";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${darkColor};padding:28px 32px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.3em;
                        text-transform:uppercase;color:${accentColor};margin-bottom:6px;">
                NovaTress Salon
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;
                         font-family:Georgia,serif;line-height:1.3;">
                Thank You For Reaching Out To Us
              </h1>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr><td style="height:3px;background:${accentColor};"></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 24px;">
              <p style="margin:0 0 16px 0;font-size:15px;color:${darkColor};line-height:1.7;font-family:sans-serif;">
                Dear <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#555555;line-height:1.8;font-family:sans-serif;">
                We have successfully received your
                <strong style="color:${darkColor};">
                  ${isAppointment ? "appointment booking enquiry" : "message"}
                </strong>.
                Thank you for choosing NovaTress!
              </p>
              <p style="margin:0 0 24px 0;font-size:14px;color:#555555;line-height:1.8;font-family:sans-serif;">
                Our team will review your request and get back to you
                <strong style="color:${darkColor};">within 24 hours</strong>.
                We look forward to serving you.
              </p>

              <!-- Highlight box -->
              <div style="background:${accentColor}1A;border-left:3px solid ${accentColor};
                          padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:24px;">
                <p style="margin:0;font-size:13px;color:${darkColor};font-weight:500;font-family:sans-serif;">
                  If you have any urgent queries, feel free to call or WhatsApp us directly.
                </p>
              </div>

              <p style="margin:0;font-size:14px;color:#555555;line-height:1.8;font-family:sans-serif;">
                Warm regards,<br/>
                <strong style="color:${darkColor};">The NovaTress Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9F9F9;padding:18px 32px;border-top:1px solid #EEEEEE;">
              <p style="margin:0;font-size:11px;color:#AAAAAA;text-align:center;font-family:sans-serif;">
                This is an automated confirmation email from NovaTress Salon.
                Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/* ── Build professional HTML email body ────────────────────────── */
function buildHtmlContent(data) {
  const {
    formType, name, email, phone,
    service, date, time, message,
  } = data;

  const isAppointment = formType === "appointment";
  const accentColor   = "#C8A96E";
  const darkColor     = "#222222";

  /* Only include rows that have a value */
  const rows = [
    { label: "Name",    value: name  },
    { label: "Phone",   value: phone },
    { label: "Email",   value: email   || "—" },
    { label: "Service", value: service || "—" },
    ...(isAppointment
      ? [
          { label: "Preferred Date", value: date || "—" },
          { label: "Preferred Time", value: time || "—" },
        ]
      : []),
    { label: "Message", value: message || "—" },
  ];

  const tableRows = rows.map(({ label, value }) => `
    <tr>
      <td style="
        padding: 10px 16px;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #555555;
        background: #F9F9F9;
        border-bottom: 1px solid #EEEEEE;
        white-space: nowrap;
        width: 30%;
      ">${label}</td>
      <td style="
        padding: 10px 16px;
        font-family: sans-serif;
        font-size: 13px;
        color: ${darkColor};
        border-bottom: 1px solid #EEEEEE;
      ">${value}</td>
    </tr>
  `).join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${darkColor};padding:28px 32px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.3em;
                        text-transform:uppercase;color:${accentColor};margin-bottom:6px;">
                NovaTress Salon
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;
                         font-family:Georgia,serif;line-height:1.3;">
                ${isAppointment ? "New Appointment Request" : "New Contact Message"}
              </h1>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr><td style="height:3px;background:${accentColor};"></td></tr>

          <!-- Intro -->
          <tr>
            <td style="padding:24px 32px 16px;">
              <p style="margin:0;font-size:14px;color:#666666;line-height:1.6;">
                You have received a new
                <strong style="color:${darkColor};">
                  ${isAppointment ? "appointment request" : "contact message"}
                </strong>
                through the NovaTress website.
              </p>
            </td>
          </tr>

          <!-- Data table -->
          <tr>
            <td style="padding:8px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #EEEEEE;border-radius:8px;overflow:hidden;">
                ${tableRows}
              </table>
            </td>
          </tr>

          <!-- CTA note -->
          <tr>
            <td style="padding:0 32px 28px;">
              <div style="background:${accentColor}1A;border-left:3px solid ${accentColor};
                          padding:12px 16px;border-radius:0 6px 6px 0;">
                <p style="margin:0;font-size:13px;color:${darkColor};font-weight:500;">
                  ${isAppointment
                    ? "Please confirm this appointment by contacting the client directly."
                    : "Please respond to this enquiry within 24 hours."}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9F9F9;padding:18px 32px;border-top:1px solid #EEEEEE;">
              <p style="margin:0;font-size:11px;color:#AAAAAA;text-align:center;">
                This email was sent automatically by the NovaTress website contact system.
                Do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/* ── POST handler ──────────────────────────────────────────────── */
export async function POST(request) {

  /* ── 1. Check env variables ── */
  const apiKey         = process.env.BREVO_API_KEY;
  const senderEmail    = process.env.BREVO_SENDER_EMAIL;
  const receiverEmail  = process.env.BREVO_RECEIVER_EMAIL;
  const senderName     = process.env.BREVO_SENDER_NAME || "NovaTress Website";

  if (!apiKey || apiKey === "your_brevo_api_key_here") {
    console.error("[send-email] BREVO_API_KEY is not configured in .env.local");
    return NextResponse.json(
      {
        success: false,
        message: "Email service is not configured. Please set BREVO_API_KEY in .env.local.",
      },
      { status: 500 }
    );
  }

  if (!senderEmail || senderEmail === "your_verified_sender_email@example.com") {
    console.error("[send-email] BREVO_SENDER_EMAIL is not configured in .env.local");
    return NextResponse.json(
      {
        success: false,
        message: "Sender email is not configured. Please set BREVO_SENDER_EMAIL in .env.local.",
      },
      { status: 500 }
    );
  }

  if (!receiverEmail || receiverEmail === "your_receiver_email@example.com") {
    console.error("[send-email] BREVO_RECEIVER_EMAIL is not configured in .env.local");
    return NextResponse.json(
      {
        success: false,
        message: "Receiver email is not configured. Please set BREVO_RECEIVER_EMAIL in .env.local.",
      },
      { status: 500 }
    );
  }

  /* ── 2. Parse request body ── */
  let body;
  try {
    body = await request.json();
  } catch (_) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const {
    formType = "contact",
    name, phone, email,
    service, date, time, message,
  } = body;

  /* ── 3. Server-side validation ── */
  const errors = validateBody({ name, phone, email });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Validation failed.", errors },
      { status: 422 }
    );
  }

  /* ── 4. Build email subject ── */
  const subject = formType === "appointment"
    ? "New Appointment Request - NovaTress"
    : "New Contact Message - NovaTress";

  /* ── 5. Build Brevo payload ── */
  const payload = {
    sender: {
      name:  senderName,
      email: senderEmail,
    },
    to: [
      { email: receiverEmail },
    ],
    subject,
    htmlContent: buildHtmlContent({
      formType, name, phone,
      email:   email   || "",
      service: service || "",
      date:    date    || "",
      time:    time    || "",
      message: message || "",
    }),
  };

  /* Add reply-to only when user provided a valid email */
  if (email && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    payload.replyTo = { email: email.trim(), name: name };
  }

  /* ── 6. Call Brevo API — send admin notification (existing behavior) ── */
  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "content-type": "application/json",
        "api-key":      apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!brevoResponse.ok) {
      /* Brevo returned a non-2xx status */
      const errorBody = await brevoResponse.text();
      console.error("[send-email] Brevo API error (admin mail):", brevoResponse.status, errorBody);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again or contact us directly.",
        },
        { status: 502 }
      );
    }

    /* ── 7. Send user confirmation email (only if user provided a valid email) ── */
    if (email && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      const userPayload = {
        sender: {
          name:  senderName,
          email: senderEmail,
        },
        to: [
          { email: email.trim(), name: name },
        ],
        subject: "Thank You For Reaching Out To Us",
        htmlContent: buildUserConfirmationHtml({
          formType, name,
        }),
      };

      try {
        const userMailResponse = await fetch(BREVO_API_URL, {
          method: "POST",
          headers: {
            "accept":       "application/json",
            "content-type": "application/json",
            "api-key":      apiKey,
          },
          body: JSON.stringify(userPayload),
        });

        if (!userMailResponse.ok) {
          const errBody = await userMailResponse.text();
          /* Log the error but do NOT fail the whole request —
             admin mail already went through successfully */
          console.error("[send-email] Brevo API error (user confirmation mail):",
            userMailResponse.status, errBody);
        }
      } catch (userMailError) {
        /* Same — log only, admin mail already sent */
        console.error("[send-email] Network error sending user confirmation mail:", userMailError);
      }
    }

    /* ── 8. Success ── */
    return NextResponse.json(
      {
        success: true,
        message: formType === "appointment"
          ? "Your appointment request has been submitted successfully. Our team will contact you soon."
          : "Your message has been sent successfully. Our team will contact you soon.",
      },
      { status: 200 }
    );

  } catch (networkError) {
    console.error("[send-email] Network error calling Brevo:", networkError);
    return NextResponse.json(
      {
        success: false,
        message: "Network error. Please check your connection and try again.",
      },
      { status: 503 }
    );
  }
}
