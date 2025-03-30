import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post('https://jllc-back.com/proservicios/api/general_login', body, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Deshabilitar la validación de certificados SSL (solo para desarrollo)
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
    });

    const data = response.data;
    console.log(data);

    if (response.status !== 200) {
      console.error('Error de API:', data);
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
