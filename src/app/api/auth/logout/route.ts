import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = await fetch('http://localhost:4000/api/general_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await req.json()),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error('Error de API:', data); // Log de error si no es ok
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    
    const dataCookies = {
      id: data.data?.id,
      name: data.data?.firstName || '',
      email: data.data?.email || '',
      typeUser: data.data?.type_user || '',
      token: data.token,
      id_municipality: data.data?.id_municipality || '',
      id_locality: data.id_locality,
      
    };

    const serializedData = JSON.stringify(dataCookies);
    const res = NextResponse.json(data, { status: 200 });
    res.cookies.set('user', serializedData, { httpOnly: false, path: '/' });

    return res;
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
