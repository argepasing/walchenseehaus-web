import type { Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(new URLSearchParams(url.searchParams));

  // return and reject if params.password is not [a-zA-Z0-9]
  if (!/^[a-zA-Z0-9]+$/.test(params.password)) {
    return new Response("Bad Request", { status: 400 });
  }

  const {
    geo: { country },
  } = context;

  const area_target_url = new URL(Netlify.env.get("VITE_MITGLIEDER_IFRAME_HOST") ?? "" + Netlify.env.get("VITE_MITGLIEDER_IFRAME_PATH") ?? "");
  const area_secret = Netlify.env.get("VITE_MITGLIEDER_SECRET");

  const html_response_success = `
    <iframe src="${area_target_url.href}" width="100%" height="600" frameBorder="0">Loading…</iframe>
  `;

  const html_response_error = `
    <div class="response-box-error">
      <h1>Zugriff verweigert</h1>
      <p>Das Password ist nicht richtig.</p>
    </div>
  `;

  if (params.password === area_secret && country?.code === "DE") {
    // Return the HTML template with status 200
    return new Response(html_response_success, { status: 200, headers: { "Content-Type": "text/html" } });
  }

  // return json response with status 401
  return new Response(html_response_error, { status: 401, headers: { "Content-Type": "text/html" } });
};
