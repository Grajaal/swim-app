import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    const response = await fetch("http://127.0.0.1:8000/generate-sql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("Error connecting to AI service");
    }

    const data = await response.json();

    console.log(data);

    return NextResponse.json({ botMessage: data.sql_query });
  } catch (error) {
    console.error("Error in chat route", error);
    return NextResponse.json(
      { error: "Failed to fetch response from AI service" },
      { status: 500 }
    )
  }
}