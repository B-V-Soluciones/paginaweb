import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

    // Validación básica
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase
    const { data: contactData, error: supabaseError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          company,
        },
      ])
      .select();

    if (supabaseError) {
      console.error('Error al guardar en Supabase:', supabaseError);
      return NextResponse.json(
        { error: 'Error al guardar el contacto' },
        { status: 500 }
      );
    }

    // 2. Enviar email de notificación con Resend
    try {
      await resend.emails.send({
        from: 'B&V Soluciones <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'santiagoboterocastro@gmail.com',
        subject: `🔔 Nuevo contacto desde la web: ${company}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ec672d;">Nuevo contacto desde B&V Soluciones</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>👤 Nombre:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>🏢 Empresa:</strong> ${company}</p>
            </div>
            <p style="color: #666; font-size: 14px;">
              Recibido el ${new Date().toLocaleString('es-ES', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              Este email fue generado automáticamente desde el formulario de contacto de B&V Soluciones.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
    }

    return NextResponse.json(
      { 
        message: 'Contacto registrado exitosamente',
        data: contactData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en la API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
