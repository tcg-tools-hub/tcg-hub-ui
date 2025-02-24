import { getClient } from "@/lib/apollo-client";
import { BULK_INSERT_CARDS } from "@/lib/mutations/cards";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = getClient()

  const { cardsList, gameStoreId } = await request.json();

  const mapped = cardsList.map((card: { [x: string]: any; }) => ({
    editionEn: card["Edition"],
    editionAcronym: card["Edition code"],
    nameEn: card["Name"],
    stockCount: Number(card["QuantityX"].replace("x", "")),
    price: parseFloat(card["Price (total)"].replace(/[^0-9,.]/g, "").replace(",", ".")),
  }))

  try {
    await client.mutate({
      mutation: BULK_INSERT_CARDS,
      variables: { GameStoreId: gameStoreId, MagicCards: mapped },
    });

    return NextResponse.json("SUCESSO");
  } catch (error) {
    console.error("Erro ao salvar cards", error);
    return NextResponse.json({ error: "Erro ao salvar cards" }, { status: 500 });
  }
}