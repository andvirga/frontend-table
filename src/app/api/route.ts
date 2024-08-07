import jsonData from './pages.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page'))

  const lastElem = (page * 10) - 1;
  const firstElem = lastElem - 9;
  const data = jsonData.slice(firstElem, lastElem);

  return Response.json(data)
}
