import jsonData from './pages.json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page'))

    // 1: 0 - 9
    // 2: 10 - 19
    // 3: 20 - 29

    const lastElem = (page * 10) - 1;
    const firstElem = lastElem - 9;
    const data = jsonData.slice(firstElem, lastElem);

    console.log('>>> page', page)
    console.log('>>> firstElem', firstElem)
    console.log('>>> lastElem', lastElem)
    
    return Response.json(data)
  }