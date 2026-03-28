import { NextRequest, NextResponse } from "next/server";
import { createProject } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await createProject({
      name: body.name,
      description: body.description || "",
      goal: body.goal || "",
      status: body.status || "planning",
      current_stage: body.current_stage || "",
      tags: body.tags || [],
    });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
