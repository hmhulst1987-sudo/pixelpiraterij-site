const endpoint = "https://api.resend.com/emails";

function operatorAddress(): string {
  return process.env.DOMAIN_OPERATOR_EMAIL || "info@kunstvanvb.nl";
}

function senderAddress(): string {
  return process.env.EMAIL_FROM || "PixelPiraterij <noreply@pixelpiraterij.nl>";
}

/**
 * Sends mail when Resend is configured. Never throws: a failed notification
 * must not turn a completed registration into a failed webhook.
 */
export async function sendMail(options: { to: string; subject: string; text: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.info(`[mail niet verstuurd, geen RESEND_API_KEY] ${options.to} — ${options.subject}`);
    return false;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: senderAddress(),
        to: [options.to],
        subject: options.subject,
        text: options.text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`mail mislukt (${response.status}) voor ${options.to}`);
      return false;
    }
    return true;
  } catch (failure) {
    console.error("mail mislukt", failure instanceof Error ? failure.message : failure);
    return false;
  }
}

export async function notifyOperator(subject: string, text: string): Promise<void> {
  await sendMail({ to: operatorAddress(), subject, text });
}
