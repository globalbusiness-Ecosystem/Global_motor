import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: "69a74037fab96b973533c5a8",
        name: "Contact Seller",
        description: "Pay to contact the seller",
        price_in_pi: 1,
        total_quantity: 9999,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
  });
}
