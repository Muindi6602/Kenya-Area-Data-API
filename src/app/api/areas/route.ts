import { NextResponse } from 'next/server';
import areasData from '../../../../public/data/areas.json';

// Define types for the JSON structure
interface ConstituencyData {
  [constituency: string]: string[];
}

interface AreaData {
  [county: string]: ConstituencyData;
}

// Public API key
const PUBLIC_API_KEY = 'keyPub1569gsvndc123kg9sjhg';

// GET handler for the API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');
  const county = searchParams.get('county');
  const constituency = searchParams.get('constituency');

  // Validate API key
  if (apiKey !== PUBLIC_API_KEY) {
    return NextResponse.json(
      { error: 'Invalid API key' },
      { status: 401 }
    );
  }

  const data: AreaData = areasData;

  // If no parameters, return full data
  if (!county && !constituency) {
    return NextResponse.json(data, { status: 200 });
  }

  // Filter by county
  if (county && !constituency) {
    if (!data[county]) {
      return NextResponse.json(
        { error: 'County not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ [county]: data[county] }, { status: 200 });
  }

  // Filter by county and constituency
  if (county && constituency) {
    if (!data[county]) {
      return NextResponse.json(
        { error: 'County not found' },
        { status: 404 }
      );
    }
    if (!data[county][constituency]) {
      return NextResponse.json(
        { error: 'Constituency not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { [county]: { [constituency]: data[county][constituency] } },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: 'Invalid query parameters' },
    { status: 400 }
  );
}