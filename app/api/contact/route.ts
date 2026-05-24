import { NextRequest, NextResponse } from "next/server";
import { appendLead } from "@/lib/sheets";
import { resend } from "@/lib/resend";

const recipientEmail = process.env.NEXT_PUBLIC_EMAIL ?? "ramnagar.uk@gdgoenkahealthcare.in";
const senderEmail = process.env.RESEND_FROM_EMAIL ?? "leads@yourdomain.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, course = "", source = "Website" } = body as {
      name?: string;
      phone?: string;
      course?: string;
      source?: string;
    };

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    await appendLead({ name, phone, course, source });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: senderEmail,
        to: recipientEmail,
        subject: `New Admission Enquiry — ${name}`,
        html: `
          <h2>New Lead from Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Course Interest:</strong> ${course || "Not specified"}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
