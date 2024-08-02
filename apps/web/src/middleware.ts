import { NextRequest, NextResponse } from 'next/server';
import ssrMainApi from './app/_lib/axios/ssrMainApi';
import { jwtDecode } from 'jwt-decode';

// Define the structure of the JWT payload
interface JwtPayload {
  role: 'user' | 'admin' | 'developer';
}

const guestOnly = ['/register', '/login', '/forgot'];
const developerOnly = ['/developer', '/developer-dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('rauth')?.value || '';
  const response = NextResponse.next();

  // Validate the token and get a new one if valid
  const access_token = await ssrMainApi()
    .get('/user/validate', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      response.cookies.set('aauth', res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      response.cookies.delete('aauth');
      response.cookies.delete('rauth');
      return false;
    });

  let userType = 'guest';
  if (access_token) {
    const decodedToken: JwtPayload = jwtDecode(access_token);
    userType = decodedToken.role;
  }
  console.log('type', userType);

  // Define route restrictions
  const adminRoutes = pathname.includes('/admin');
  const developerRoutes = pathname.includes('/developer');
  const userRoutes = pathname.includes('/user');

  // Admin access restrictions
  if (userType !== 'admin' && adminRoutes) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (userType !== 'admin' && pathname === '/admin-register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Developer access restrictions
  if (userType !== 'developer' && developerRoutes) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (userType !== 'developer' && pathname === '/developer-register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User access restrictions
  if (userType !== 'user' && userRoutes) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (userType !== 'user' && pathname === '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Guest access restrictions
  if (userType === 'guest' && (userRoutes || adminRoutes || developerRoutes)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/register',
    '/login',
    '/forgot',
    '/admin/:path*',
    '/developer/:path*',
    '/user/:path*',
  ],
};
