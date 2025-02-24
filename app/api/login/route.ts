import { getClient } from "@/lib/apollo-client";
import { LOGIN } from "@/lib/mutations/login";
import { GET_CURRENT_USER } from "@/lib/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = getClient()

  const { email, password } = await request.json();

  try {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: { email, password },
    });

    const { data: userData } = await client.query({
      query: GET_CURRENT_USER,
      variables: { email }
    })

    console.log(userData)

    return NextResponse.json({ token: data.signIn.token, gameStoreId: userData.users[0].gameStores[0].id });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const client = getClient()
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: "Email is mandatory in getCards" }, { status: 500 })
  }
  try {
    const { data } = await client.query({
      query: GET_CURRENT_USER,
      variables: {
        email
      }
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}