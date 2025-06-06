// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(_request: Request) {
  return Response.json([
    {
      test: 1,
    },
  ]);
}
