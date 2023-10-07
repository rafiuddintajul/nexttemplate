import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req){
    const admin = req.nextauth.token?.role === 'admin'
    const sensitiveMethod = req.method !== 'GET'
    const sensitiveApi = /\/api\/(?:invoice|writeoff)\/?[\w.,'-=+?!:;><]*/i

    // if user not admin and pathname is start with api
    // if (!admin && req.nextUrl.pathname.startsWith('/api') ) {
    //   // if either request or api is extra sensitive
    //   if ( sensitiveMethod || req.nextUrl.pathname.match(sensitiveApi)) {
    //     return new Response(JSON.stringify({ message: "Unauthorized request" }), { status: 401})  
    //   }
    // }

    // if authenticated but not admin
    // if (req.nextUrl.pathname.startsWith('/admin') && !admin) {
    //   return NextResponse.rewrite(new URL('/'))
    // }
  },{
    callbacks: {
      authorized: async ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith('/api')) {
          return true
        }
        return token?.role === 'admin'
      },
    }
  }
)
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}

// temporary removed: '/api/:path*'