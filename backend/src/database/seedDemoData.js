import { documentIngestionService } from '../services/documentIngestionService.js';
import { pool } from './pool.js';
import { logger } from '../utils/logger.js';

const demoDocuments = [
  {
    title: 'Battery Troubleshooting Guide',
    sourceType: 'product_doc',
    sourceName: 'battery-guide.md',
    text: `
Battery drain is commonly caused by high screen brightness, background applications, poor power settings, worn batteries, or calibration issues.

Battery calibration steps:
1. Charge the laptop uninterrupted to 100%.
2. Keep it plugged in for 30 additional minutes.
3. Use the laptop normally until it reaches 5% or shuts down.
4. Charge it back to 100% without interruption.

Battery calibration usually takes 4 to 6 hours total. The discharge phase usually takes 2 to 3 hours, and the charging phase usually takes 2 to 3 hours.

To reduce battery drain, set the power mode to Balanced or Battery Saver, lower brightness, close power-hungry apps, disable unnecessary startup apps, and update the operating system and device drivers.

If battery life remains below 2 hours after calibration and power optimization, the battery may need diagnostics or replacement.
`
  },
  {
    title: 'Warranty Policy',
    sourceType: 'product_doc',
    sourceName: 'warranty-policy.md',
    text: `
Standard device warranty lasts 12 months from the purchase date.

The warranty covers manufacturing defects, hardware failures under normal use, keyboard or display malfunctions caused by defects, and battery failure confirmed by diagnostics.

The warranty does not cover accidental damage, liquid damage, drops, unauthorized repairs, software issues caused by third-party modifications, or normal wear and tear.

Customers can check warranty status from My Account > Devices > Warranty Info. A serial number may be required.
`
  },
  {
    title: 'Account Password Reset FAQ',
    sourceType: 'faq',
    sourceName: 'account-faq.md',
    text: `
Question: How do I reset my password?
Answer: Go to the login page, select Forgot Password, enter your registered email address, and follow the reset link sent to your inbox. The reset link is valid for 24 hours.

Question: What if I do not receive the password reset email?
Answer: Wait five minutes, check spam or junk folders, confirm the email address is correct, and request a new reset link.
`
  },
  {
    title: 'Refund and Billing Policy',
    sourceType: 'product_doc',
    sourceName: 'billing-policy.md',
    text: `
Defective hardware may qualify for refund or replacement within 30 days of purchase when proof of purchase is available.

Billing disputes, unauthorized charges, refund exceptions, legal threats, or account-specific payment issues should be escalated to a human billing specialist because they require account verification.

Approved refunds usually take 3 to 5 business days after verification, depending on the payment provider.
`
  },
  {
    title: 'Shipping and Order Tracking FAQ',
    sourceType: 'faq',
    sourceName: 'shipping-faq.md',
    text: `
Question: How can I track my order?
Answer: Sign in to your account, open Orders, select the recent order, and view the tracking link. The tracking link is also sent in the shipping confirmation email.

Question: How long does standard shipping take?
Answer: Standard shipping usually takes 3 to 5 business days after dispatch.
`
  }
];

for (const document of demoDocuments) {
  logger.info(`Seeding ${document.title}`);
  await documentIngestionService.ingestText(document);
}

logger.info('Demo knowledge base seeded.');
await pool.end();
