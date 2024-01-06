// /* eslint-disable no-unused-vars */
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   // console.log(request, "from middleware")
//   try {
//     const pathname = request.nextUrl.pathname;

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/user-middleware`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: request.cookies.get("token"),
//         }),
//       },
//     );

//     if (response.ok) {
//       const user = await response.json();
//       console.log(user.decoded, "gotten from middleware");
//       if (user.decoded.position === "admin") {
//         if (pathname === "/admin/login" || pathname === "/admin/signup") {
//           return NextResponse.redirect(
//             `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin`,
//           );
//         } else {
//           return NextResponse.next();
//         }
//       } else {
//         if (
//           pathname === "/admin" ||
//           pathname === "/admin/login" ||
//           pathname === "/admin/signup"
//         ) {
//           return NextResponse.redirect(
//             `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin/employee-page`,
//           );
//         } else {
//           return NextResponse.next();
//         }
//       }
//     } else {
//       if (
//         pathname.startsWith("/admin") &&
//         pathname !== "/admin/login" &&
//         pathname !== "/admin/signup"
//       ) {
//         return NextResponse.redirect(
//           `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin/login`,
//         );
//       }
//       return NextResponse.next();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
