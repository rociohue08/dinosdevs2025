export const generateWelcomeEmail = (name: string, email: string) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; text-align: center;">¡Bienvenido a DinoDevs! 🦖</h2>
        <p style="font-size: 16px; color: #333333;">
          ¡Hola <strong>${name}</strong>! Gracias por registrarte en <strong>DinoDevs</strong>.
        </p>
        <p style="font-size: 16px; color: #333333;">
          Estamos emocionados de tenerte con nosotros. Ahora podrás disfrutar de todos nuestros recursos y contenido educativo.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://dinodevs.com " style="background-color: #2980b9; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px;">
            Ir al sitio web
          </a>
        </div>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
          © 2025 DinoDevs. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;
};