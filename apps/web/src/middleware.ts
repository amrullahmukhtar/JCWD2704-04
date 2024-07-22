import { NextRequest, NextResponse } from "next/server";
import ssrMainApi from "./app/_lib/axios/ssrMainApi";
import { jwtDecode } from "jwt-decode";

// Define the structure of the JWT payload
interface JwtPayload {
  role: "user" | "admin" | "developer";
}

const guestOnly = ["/register", "/login", "/forgot"];
const developerOnly = ["/developer", "/developer-dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("rauth")?.value || ".";
  const response = NextResponse.next();

  const access_token = await ssrMainApi()
    .get("/user/validate", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      response.cookies.set("aauth", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      response.cookies.delete("aauth");
      response.cookies.delete("rauth");
      return false;
    });


let userType = "guest";
if (access_token) {
  const decodedToken: any = jwtDecode(access_token);
  userType =
    decodedToken?.company_name != undefined
      ? "admin"
      : decodedToken?.gender || decodedToken?.googleId != undefined
      ? "user"
      : decodedToken?.bank_acc_no != undefined
      ? "developer"
      : "guest";
}
console.log("type", userType);

  // Define route restrictions
  const adminRoutes = pathname.startsWith("/admin");
  const developerRoutes = pathname.startsWith("/developer");
  const userRoutes = pathname.startsWith("/user") || pathname.startsWith("/admin");

  // Admin access restrictions
  if (userType === "admin" && !adminRoutes) {
    return NextResponse.redirect(new URL("/admin", request.url));
  } else if (userType === "admin" && pathname === "/admin-login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Developer access restrictions
  if (userType === "developer" && !developerRoutes) {
    return NextResponse.redirect(new URL("/developer-login", request.url));
  } else if (userType === "developer" && pathname === "/developer-login") {
    return NextResponse.redirect(new URL("/developer-dashboard", request.url));
  }

  // User access restrictions
  if (userType === "user" && (adminRoutes || developerRoutes)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle guest users
  if (userType === "user" && guestOnly.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    userType !== "user" &&
    (pathname.startsWith("/chekOut/") || pathname.endsWith("/ticket"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    "/register",
    "/login",
    "/forgot",
    "/admin/:path*",
    "/:path*/ticket",
    "/chekOut/:path*",
    "/developer/:path*",
  ],
};
