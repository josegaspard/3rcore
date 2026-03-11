import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const logoUrl = 'https://3-rcore.vercel.app/icons/LOGO3R.png';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { nombre, apellido, email, telefono, mensaje, website } = await request.json();

    if (!nombre || !email || !mensaje  || !website) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const responsiveStyles = `
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 20px !important; }
          .inner-padding { padding: 20px !important; }
          .mobile-hide { display: none !important; }
          h1 { font-size: 24px !important; }
        }
        @media (prefers-color-scheme: dark) {
          .dark-mode-bg { background-color: #1a1a2e !important; }
          .dark-mode-card { background-color: #16213e !important; }
          .dark-mode-text { color: #e4e4e7 !important; }
          .dark-mode-border { border-color: #374151 !important; }
        }
      </style>
    `;

    const result = await resend.batch.send([
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: 'piero.roque@3rcore.com',
        subject: `Nuevo contacto: ${nombre} quiere hablar con 3RCORE`,
        html: `
          <html>
            <head>${responsiveStyles}</head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc;" class="dark-mode-bg">
              <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
                <div style="background-color: #ffffff; border-radius: 20px; padding: 0; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden;" class="dark-mode-card dark-mode-border">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #E91E63 0%, #9C27B0 100%); padding: 40px; text-align: center;">
                    <img src="${logoUrl}" alt="3RCORE" style="width: 100px; margin-bottom: 15px;">
                    <h2 style="font-size: 22px; color: #ffffff; margin: 0; font-weight: 600; letter-spacing: -0.5px;">¡Nuevo Lead!</h2>
                  </div>
                  
                  <!-- Body -->
                  <div style="padding: 45px;" class="inner-padding">
                    <!-- Alert Badge -->
                    <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #10b981; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                      <p style="margin: 0; font-weight: 600; color: #059669; font-size: 15px; letter-spacing: 0.3px;">
                        ALGUIEN SE HA INTERESADO EN LO QUE HACEMOS
                      </p>
                    </div>
                    
                    <!-- Client Data Card -->
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 30px; margin: 30px 0;" class="dark-mode-card dark-mode-border">
                      <h3 style="color: #111827; margin-top: 0; margin-bottom: 20px; font-size: 18px; font-weight: 600;" class="dark-mode-text">Información del Contacto</h3>
                      
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;" class="dark-mode-border">Persona:</td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; text-align: right; font-size: 14px;" class="dark-mode-border dark-mode-text">${nombre}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;" class="dark-mode-border">Empresa:</td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; text-align: right; font-size: 14px;" class="dark-mode-border dark-mode-text">${apellido}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;" class="dark-mode-border">Correo:</td>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px;" class="dark-mode-border">
                            <a href="mailto:${email}" style="color: #E91E63; text-decoration: none; font-weight: 500;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">WhatsApp/Tel:</td>
                          <td style="padding: 12px 0; color: #111827; font-weight: 500; text-align: right; font-size: 14px;" class="dark-mode-text">${telefono}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Message -->
                    <div style="margin: 30px 0;">
                      <div style="background: linear-gradient(to right, #E91E63, #9C27B0); height: 3px; border-radius: 10px; margin-bottom: 15px;"></div>
                      <h4 style="color: #E91E63; margin: 0 0 12px 0; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</h4>
                      <p style="line-height: 1.8; color: #374151; margin: 0; font-size: 15px; background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;" class="dark-mode-text dark-mode-card dark-mode-border">${mensaje}</p>
                      <p style="line-height: 1.8; color: #374151; margin: 0; font-size: 15px; background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;" class="dark-mode-text dark-mode-card dark-mode-border">${website}</p>
                    </div>

                    <!-- CTA -->
                    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 14px; padding: 20px; margin-top: 35px; text-align: center; border: 1px solid #93c5fd;">
                      <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.6;">
                        <strong>Consejo:</strong> Responde dentro de las próximas 24 horas para maximizar la conversión.
                      </p>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb;" class="dark-mode-card dark-mode-border">
                    <p style="font-size: 12px; color: #9ca3af; margin: 0;">Enviado desde 3RCORE System</p>
                    <p style="font-size: 11px; color: #d1d5db; margin: 8px 0 0 0;">https://3-rcore.vercel.app/</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      },
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: email,
        subject: `¡Hola ${nombre}! Qué bueno saludarte`,
        html: `
          <html>
            <head>${responsiveStyles}</head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc;" class="dark-mode-bg">
              <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
                <div style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03); border: 1px solid #e5e7eb;" class="dark-mode-card dark-mode-border">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #E91E63 0%, #9C27B0 100%); padding: 45px; text-align: center;">
                    <img src="${logoUrl}" alt="3RCORE" style="width: 90px; filter: brightness(0) invert(1);">
                  </div>
                  
                  <!-- Body -->
                  <div class="inner-padding" style="padding: 50px 45px;">
                    <h1 style="font-size: 26px; margin-bottom: 20px; color: #111827; font-weight: 700; letter-spacing: -0.5px;" class="dark-mode-text">¡Recibido, ${nombre}!</h1>
                    
                    <p style="font-size: 16px; line-height: 1.7; color: #4b5563; margin-bottom: 15px;" class="dark-mode-text">
                      Muchas gracias por escribirnos y por el interés en lo que estamos creando en <strong style="color: #E91E63;">3RCORE</strong>.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.7; color: #4b5563;" class="dark-mode-text">
                      Ya tengo tu mensaje en mi bandeja de entrada. Voy a leerlo con calma y te daré una respuesta en menos de <strong style="color: #111827;" class="dark-mode-text">24 horas</strong>.
                    </p>
                    
                    <!-- Quote Card -->
                    <div style="margin: 35px 0; padding: 25px; background: linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%); border-radius: 16px; border-left: 4px solid #E91E63;">
                      <p style="margin: 0; color: #374151; font-weight: 500; line-height: 1.6; font-size: 15px; font-style: italic;" class="dark-mode-text">
                        "Estamos convencidos de que podemos aportar valor a tu proyecto. Hablamos muy pronto."
                      </p>
                      <p style="margin: 10px 0 0 0; color: #E91E63; font-weight: 600; font-size: 14px;">— Piero Roque, 3RCORE</p>
                    </div>

                    <!-- Info Box -->
                    <div style="background-color: #f9fafb; padding: 25px; border-radius: 14px; margin: 30px 0; border: 1px solid #e5e7eb;" class="dark-mode-card dark-mode-border">
                      <h4 style="margin-top: 0; color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 12px;" class="dark-mode-text">Mientras tanto...</h4>
                      <p style="color: #4b5563; line-height: 1.7; margin: 0; font-size: 14px;" class="dark-mode-text">
                        Si necesitas algo urgente o tienes alguna pregunta adicional, no dudes en responder a este correo. Estamos aquí para ayudarte.
                      </p>
                    </div>

                    <p style="font-size: 15px; color: #6b7280; margin-top: 35px; line-height: 1.6;">
                      Un saludo,<br/>
                      <strong style="color: #111827;" class="dark-mode-text">Piero Roque de 3RCORE</strong>
                    </p>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 30px; text-align: center; color: white;">
                    <div style="margin-bottom: 20px;">
                      <p style="margin: 8px 0; font-size: 14px; color: #d1d5db;"> contacto@3rcore.com</p>
                      <p style="margin: 8px 0; font-size: 14px; color: #d1d5db;"> www.3rcore.com</p>
                    </div>
                    <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                      <p style="margin: 0; opacity: 0.6; font-size: 12px; color: #9ca3af;">© 2026 3RCORE. Hecho con pasión por la tecnología.</p>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }
    ]);

    if (result.error) throw new Error(result.error.message);

    return NextResponse.json({ success: true, data: result.data });

  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ error: 'Error al procesar el envío' }, { status: 500 });
  }
}