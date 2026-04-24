import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO_EMAIL = "abir.abbas@proton.me";
const FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10).max(2000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const safe = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const html = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="font-size: 18px; margin: 0 0 16px;">New message from your portfolio</h2>
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding:6px 0; color:#666;">From</td><td><strong>${safe(data.name)}</strong> &lt;${safe(data.email)}&gt;</td></tr>
          ${data.company ? `<tr><td style="padding:6px 0; color:#666;">Company</td><td>${safe(data.company)}</td></tr>` : ""}
        </table>
        <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.55; font-size: 14px;">${safe(data.message)}</p>
      </div>
    `;

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email,
        subject: `Portfolio inquiry from ${data.name}`,
        html,
      }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend error", res.status, body);
      throw new Error(`Failed to send email (${res.status})`);
    }
    return { success: true };
  });
