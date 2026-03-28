export function welcomeEmail({
  firstName,
  locale = 'en',
}: {
  firstName: string
  locale?: string
}) {
  const isFr = locale === 'fr'

  const subject = isFr
    ? `Bienvenue dans la communauté Romandy CTO, ${firstName}`
    : `Welcome to Romandy CTO, ${firstName}`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Logo row -->
        <tr>
          <td style="padding:0 0 28px 0;">
            <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
            <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
          </td>
        </tr>

        <!-- Hero image — full bleed, rounded top -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="https://www.ctoromandy.ch/og-image.jpg"
              width="600" alt="Romandy CTO"
              style="width:100%;max-width:600px;height:auto;display:block;border-radius:16px 16px 0 0;opacity:0.92;" />
          </td>
        </tr>

        <!-- Main card — flush under image -->
        <tr>
          <td style="background:#1A1A1A;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,0.07);border-top:none;">

            <!-- Orange top bar -->
            <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);border-radius:0;"></div>

            <div style="padding:40px 40px 48px;">

              <!-- Greeting -->
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? 'Bienvenue' : 'Welcome'}
              </p>
              <h1 style="margin:0 0 20px 0;font-size:34px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
                ${firstName}.
              </h1>
              <p style="margin:0 0 36px 0;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.75;">
                ${isFr
                  ? `Vous faites maintenant partie de la communauté Romandy CTO — un réseau de plus de 500 CTOs et leaders technologiques en Romandie.`
                  : `You're now part of Romandy CTO — a network of 500+ CTOs and technology leaders across Romandy, Switzerland.`}
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>

              <!-- What's next label -->
              <p style="margin:0 0 20px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                ${isFr ? 'Ce qui vous attend' : "What's next"}
              </p>

              <!-- 3 benefits — single-column, clean -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td style="padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;margin-bottom:8px;">
                    <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#ffffff;">
                      ${isFr ? '📅  Événements mensuels' : '📅  Monthly events'}
                    </p>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.55;">
                      ${isFr
                        ? 'Soirées en présentiel, soignées — keynotes, panels et discussions ouvertes.'
                        : 'Curated in-person evenings — keynotes, panels, and open discussion.'}
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td style="padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
                    <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#ffffff;">
                      ${isFr ? '💬  Réseau privé' : '💬  Private network'}
                    </p>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.55;">
                      ${isFr
                        ? '500+ pairs. Posez une question, recevez des réponses de praticiens expérimentés.'
                        : '500+ peers. Ask a question, get answers from experienced practitioners.'}
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
                    <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#ffffff;">
                      ${isFr ? '📚  Connaissances partagées' : '📚  Shared knowledge'}
                    </p>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.55;">
                      ${isFr
                        ? 'Résumés et ressources de chaque événement, partagés avec toute la communauté.'
                        : 'Recaps and resources from every event, shared with the full community.'}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <a href="https://www.ctoromandy.ch/${locale}/register"
                      style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:15px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;">
                      ${isFr ? 'Réserver ma place →' : 'Reserve my spot →'}
                    </a>
                    <p style="margin:10px 0 0;font-size:11px;text-align:center;color:rgba(255,255,255,0.2);">
                      ${isFr ? 'Prochain événement · Toujours gratuit' : 'Next event · Always free'}
                    </p>
                  </td>
                </tr>
              </table>

            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0 0;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
              ${isFr
                ? 'Vous recevez cet email car vous avez rejoint la communauté Romandy CTO.'
                : "You're receiving this because you joined the Romandy CTO community."}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`

  return { subject, html }
}
