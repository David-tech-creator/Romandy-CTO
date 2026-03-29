export function newsletterWelcomeEmail({
  firstName,
  locale = 'en',
}: {
  firstName: string
  locale?: string
}) {
  const isFr = locale === 'fr'
  const SITE = 'https://www.ctoromandy.ch'

  const subject = isFr
    ? `Bienvenue dans la newsletter Romandy CTO AI`
    : `Welcome to the Romandy CTO AI Newsletter`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td style="padding:0 0 28px;">
          <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
          <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
        </td></tr>

        <tr><td style="background:#1A1A1A;border-radius:16px;border:1px solid rgba(255,255,255,0.07);">
          <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);border-radius:16px 16px 0 0;"></div>
          <div style="padding:40px 40px 48px;">

            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
              ${isFr ? 'Inscription confirmée' : 'Subscription confirmed'}
            </p>
            <h1 style="margin:0 0 20px;font-size:30px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;line-height:1.15;">
              ${isFr ? `Bienvenue, ${firstName}.` : `You're in, ${firstName}.`}
            </h1>

            <p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.75;">
              ${isFr
                ? `Chaque semaine, vous recevrez un condensé des actualités IA les plus importantes pour les leaders technologiques — les grandes décisions, les nouveaux outils, et les insights stratégiques. En 3 minutes.`
                : `Every week you'll get the most important AI news for technology leaders — the big moves, the new tools, and the strategic insights. In 3 minutes.`}
            </p>

            <div style="border:1px solid rgba(200,131,74,0.18);border-radius:12px;background:rgba(200,131,74,0.06);padding:22px 24px;margin-bottom:32px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? 'Ce que vous recevrez' : "What you'll get"}
              </p>
              <ul style="margin:0;padding:0;list-style:none;">
                <li style="font-size:13px;color:rgba(255,255,255,0.65);padding:4px 0;">→ ${isFr ? 'Top 3 actualités IA de la semaine' : 'Top 3 AI news of the week'}</li>
                <li style="font-size:13px;color:rgba(255,255,255,0.65);padding:4px 0;">→ ${isFr ? 'Un outil IA à connaître' : 'One AI tool you need to know'}</li>
                <li style="font-size:13px;color:rgba(255,255,255,0.65);padding:4px 0;">→ ${isFr ? 'L\'analyse stratégique pour CTOs' : 'The strategic angle for CTOs'}</li>
                <li style="font-size:13px;color:rgba(255,255,255,0.65);padding:4px 0;">→ ${isFr ? 'Prochains événements Romandy CTO' : 'Upcoming Romandy CTO events'}</li>
              </ul>
            </div>

            <a href="${SITE}/${locale}"
              style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:15px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;">
              ${isFr ? 'Visiter le site →' : 'Visit the site →'}
            </a>

          </div>
        </td></tr>

        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
            ${isFr
              ? 'Vous recevez cet email car vous vous êtes inscrit à la newsletter Romandy CTO.'
              : "You're receiving this because you signed up for the Romandy CTO newsletter."}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, html }
}
