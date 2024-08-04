import { NextRequest, NextResponse } from 'next/server';
import ssrMainApi from './app/_lib/axios/ssrMainApi';
import { jwtDecode } from 'jwt-decode';

// Define the structure of the JWT payload
interface JwtPayload {
  role: 'user' | 'admin' | 'developer';
}

// Define allowed routes for each user type
const guestOnlyRoutes = ['/register',"/", '/login', '/forgot', '/recoveryPassword', '/verification'];
const adminRoutes = ['/admin'];
const developerRoutes = ['/developer'];
const userRoutes = ['/user'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('rauth')?.value || '';
  const response = NextResponse.next();

  // Validate the token and get a new one if valid
  let userType: 'guest' | 'user' | 'admin' | 'developer' = 'guest';
  let access_token: string | false = false;

  try {
    access_token = await ssrMainApi()
      .get('/user/validate', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        response.cookies.set('aauth',   
 res.data.data);
        return res.data.data;
      });

    if (access_token) {
      const decodedToken: JwtPayload = jwtDecode(access_token);
      userType = decodedToken.role;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    response.cookies.delete('aauth');
    response.cookies.delete('rauth');
  }

  // Check if the requested path is allowed for the current user type
  if (guestOnlyRoutes.includes(pathname) && userType === 'guest') {
    // Allow guests to access specific pages
    return response;
  } else if (userType === 'admin' && adminRoutes.some(route => pathname.startsWith(route))) {
    return response;
  } else if (userType === 'developer' && developerRoutes.some(route => pathname.startsWith(route))) {
    return response;
  } else if (userType === 'user' && userRoutes.some(route => pathname.startsWith(route))) {
    return response;
  } else {
    // Redirect to login page for unauthorized users
    return NextResponse.redirect(new URL('/login', request.url));
  }
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
