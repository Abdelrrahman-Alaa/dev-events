import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      console.log(e);

      return NextResponse.json(
        { message: "Invalid json data format" },
        { status: 400 }
      );
    }
    const CreatedEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event created successfully", event: CreatedEvent },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Failed to create event",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
