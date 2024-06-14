import { redirect } from "next/navigation";

export async function GET() {
    const baseURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      response_type: "code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
    };
  
    const formattedParams = new URLSearchParams(params).toString()
    const finalUrl = `${baseURL}?${formattedParams}`
    return redirect(finalUrl)
  }