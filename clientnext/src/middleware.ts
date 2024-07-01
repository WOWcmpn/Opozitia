import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({token}) => token?.name === 'admin'
    },
  }
)

export const config = {matcher: ["/adminopozitia"]}