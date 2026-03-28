export function eventRegistrationEmail({
  firstName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventSlug,
  locale = 'en',
}: {
  firstName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventSlug: string
  locale?: string
}) {
  const isFr = locale === 'fr'

  const subject = isFr
    ? `Vous êtes inscrit — ${eventName}`
    : `You're registered — ${eventName}`

  const eventUrl = `https://www.ctoromandy.ch/${locale}/events/${eventSlug}`

  // Minimal SVG icons — stroke only, amber
  const iconDate = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
  const iconPin  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0E0E0E;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0E0E0E;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Logo -->
        <tr>
          <td style="padding:0 0 28px 0;">
            <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
            <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
          </td>
        </tr>

        <!-- Building hero image -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="https://www.ctoromandy.ch/building.jpeg"
              width="600" alt="${eventName}"
              style="width:100%;max-width:600px;height:auto;display:block;border-radius:16px 16px 0 0;filter:brightness(0.75);" />
          </td>
        </tr>

        <!-- Main card — flush under image -->
        <tr>
          <td style="background:#161616;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,0.06);border-top:none;">

            <!-- Amber accent bar -->
            <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);"></div>

            <div style="padding:40px 40px 48px;">

              <!-- Status badge -->
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? 'Inscription confirmée' : 'Registration confirmed'}
              </p>

              <!-- Headline -->
              <h1 style="margin:0 0 28px;font-size:34px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
                ${isFr ? `Vous êtes<br/>inscrit, ${firstName}.` : `You're in,<br/>${firstName}.`}
              </h1>

              <!-- Event details card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid rgba(200,131,74,0.18);border-radius:12px;background:rgba(200,131,74,0.06);">
                <tr>
                  <td style="padding:24px 26px;">

                    <p style="margin:0 0 18px;font-size:12px;font-weight:800;color:#ffffff;text-transform:uppercase;letter-spacing:0.1em;">
                      ${eventName}
                    </p>

                    <!-- Date row -->
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="width:22px;vertical-align:middle;">${iconDate}</td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.65);vertical-align:middle;">
                          ${eventDate} &nbsp;·&nbsp; ${eventTime}
                        </td>
                      </tr>
                    </table>

                    <!-- Location row -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:22px;vertical-align:middle;">${iconPin}</td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.65);vertical-align:middle;">
                          ${eventLocation}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.05);margin:0 0 28px;"></div>

              <!-- Body copy -->
              <p style="margin:0 0 36px;font-size:14px;color:rgba(255,255,255,0.45);line-height:1.8;">
                ${isFr
                  ? `Une soirée soignée — présentations, tables rondes et networking. Limité à 50 personnes. Vous avez votre place.`
                  : `A curated evening of talks, panels, and networking. Limited to 50 people. Your seat is secured.`}
              </p>

              <!-- CTAs -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="${eventUrl}"
                      style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;padding:14px 20px;border-radius:9px;text-transform:uppercase;letter-spacing:0.08em;">
                      ${isFr ? 'Voir l\'événement →' : 'View event →'}
                    </a>
                  </td>
                  <td>
                    <a href="https://www.ctoromandy.ch/${locale}"
                      style="display:block;text-align:center;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);font-size:12px;font-weight:600;text-decoration:none;padding:14px 20px;border-radius:9px;letter-spacing:0.03em;">
                      ${isFr ? 'Retour au site' : 'Back to site'}
                    </a>
                  </td>
                </tr>
              </table>

            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0 0;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.15);">Romandy CTO · Geneva, Switzerland</p>
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.1);">
              ${isFr ? 'Questions ? Répondez simplement à cet email.' : 'Questions? Just reply to this email.'}
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
