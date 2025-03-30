import { NextResponse } from 'next/server';

export function middleware(req: any) {
  console.log(`Request for ${req.nextUrl.pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*'],
};
