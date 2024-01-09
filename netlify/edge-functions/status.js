export default async (request, context) => {
  const url = new URL(request.url);

  const params = url.searchParams.get('wfh');

  const wfh = params !== null ? params.split(',') : [];

  const response = await context.next();
  let page = await response.text();

  for (const element of wfh) {
    page = page.replace(`id="h_${element}"`, `id="h_${element}" data-wfh`);
  }

  const theme = url.searchParams.get('theme');

  if (theme !== null) {
    page = page.replace(
      `main class="container"`,
      `main class="container ${theme}"`
    );
  }

  return new Response(page, response);
};
