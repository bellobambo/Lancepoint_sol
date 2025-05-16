import { submitMilestone } from "@/actions/submitGig";
import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const result = await submitMilestone(formData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message || "Milestone submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting milestone:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collection = await getCollection("submitedGigs");
    if (!collection) {
      throw new Error("Database connection failed");
    }

    const jobs = await collection.find({}).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
