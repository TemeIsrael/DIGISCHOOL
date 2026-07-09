// Script de test SMTP - à lancer avec: npx ts-node apps/api/src/scripts/test-smtp.ts
import { sendInternalMail } from '../lib/mailer';

async function testSmtp() {
  console.log('🔄 Test d\'envoi d\'email via Brevo SMTP...');
  const result = await sendInternalMail(
    'temeisrael65@gmail.com',
    '✅ Test DIGISCHOOL - Email Fonctionnel',
    `
      <div style="font-family: Arial, sans-serif; padding: 24px; background: #f5f5f5;">
        <div style="background: white; border-radius: 12px; padding: 32px; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #6C3FC9;">DIGISCHOOL</h2>
          <p style="color: #333;">Félicitations ! Le serveur d'emails est correctement configuré.</p>
          <p style="color: #666; font-size: 14px;">Ce mail a été envoyé via <strong>Brevo SMTP</strong>.</p>
        </div>
      </div>
    `
  );
  if (result) {
    console.log('✅ Email envoyé avec succès à temeisrael65@gmail.com');
  } else {
    console.log('❌ Échec de l\'envoi de l\'email - vérifiez les logs');
  }
  process.exit(0);
}

testSmtp();
