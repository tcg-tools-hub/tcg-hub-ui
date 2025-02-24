import { getClient } from "@/lib/apollo-client";
import { STOCK_TABLE } from "@/lib/queries/cards";
import { StockTableResponse } from "@/lib/types/stock-table";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
    const client = getClient()
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    if (!email) {
        return NextResponse.json({ error: "Email is mandatory in getCards" }, { status: 500 })
    }
    try {
        const { data } = await client.query<StockTableResponse>({
            query: STOCK_TABLE,
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