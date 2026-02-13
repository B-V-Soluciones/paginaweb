import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    // Validación básica
    if (!email || !name) {
      return NextResponse.json(
        { error: "Email y nombre son requeridos" },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Guardar en Supabase (tabla newsletter_subscribers)
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name.trim(),
          subscribed_at: new Date().toISOString(),
          source: "website",
        },
      ])
      .select();

    if (error) {
      // Si ya está suscrito (duplicate key)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Este email ya está suscrito" },
          { status: 400 }
        );
      }
      
      console.error("Error al guardar en Supabase:", error);
      return NextResponse.json(
        { error: "Error al procesar la suscripción" },
        { status: 500 }
      );
    }

    // Opcional: Enviar email de bienvenida con Resend
    // (comentado por ahora, puedes activarlo cuando lo necesites)
    /*
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "B&V Soluciones <hola@byvsoluciones.dev>",
        to: email,
        subject: "¡Bienvenido a B&V Soluciones!",
        html: `
          <h1>¡Gracias por suscribirte, ${name}!</h1>
          <p>Recibirás contenido exclusivo sobre IA, automatización y Cloud directamente en tu inbox.</p>
          <p>Si tienes alguna pregunta, responde este email.</p>
          <br>
          <p>Saludos,<br>B&V Soluciones</p>
        `,
      });
    } catch (emailError) {
      console.error("Error al enviar email de bienvenida:", emailError);
      // No fallar la suscripción si el email falla
    }
    */

    return NextResponse.json(
      { 
        success: true, 
        message: "Suscripción exitosa",
        data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en /api/newsletter:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
