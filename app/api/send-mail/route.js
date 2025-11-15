import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
    try {
        const { name, email, message } = await req.json()

        const data = await resend.emails.send({
            from: "Ansif Portfolio <onboarding@resend.dev>",
            to: "stark858981@gmail.com",
            subject: `Message from ${name}`,
            html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        })
        return NextResponse.json({ success: true, data }, { status: 200 })

    } catch (error) {
        console.error('Error at mail API: ', error)
        return NextResponse.json({success: false, error}, { status: 500})
    }
}