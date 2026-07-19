import { Resend } from "resend";

// Initialize Resend with a fallback to prevent crashing if the key is missing during dev
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export const emailService = {
  /**
   * Send an order confirmation email to the customer
   */
  async sendOrderConfirmation(email: string, orderNumber: string, total: number) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email Service Stub] Order confirmation for ${orderNumber} sent to ${email}`);
      return { success: true, stub: true };
    }

    try {
      const data = await resend.emails.send({
        from: "MotionCommerce <orders@motioncommerce.com>",
        to: email,
        subject: `Order Confirmation #${orderNumber}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Thank you for your order!</h2>
            <p>Your order <strong>#${orderNumber}</strong> has been received and is currently being processed.</p>
            <p><strong>Total Amount:</strong> ৳${total.toLocaleString()}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">MotionCommerce Team</p>
          </div>
        `,
      });
      return { success: true, data };
    } catch (error) {
      console.error("Failed to send order confirmation email", error);
      return { success: false, error };
    }
  },

  /**
   * Send a welcome email when a user registers
   */
  async sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email Service Stub] Welcome email sent to ${email}`);
      return { success: true, stub: true };
    }

    try {
      const data = await resend.emails.send({
        from: "MotionCommerce <hello@motioncommerce.com>",
        to: email,
        subject: `Welcome to MotionCommerce, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Welcome aboard, ${name}!</h2>
            <p>We're thrilled to have you here. Start exploring our latest collections today.</p>
            <a href="https://motioncommerce.com/products" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Shop Now</a>
          </div>
        `,
      });
      return { success: true, data };
    } catch (error) {
      console.error("Failed to send welcome email", error);
      return { success: false, error };
    }
  },
  
  /**
   * Send a password reset email
   */
  async sendPasswordResetEmail(email: string, resetUrl: string) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email Service Stub] Password reset link sent to ${email}: ${resetUrl}`);
      return { success: true, stub: true };
    }

    try {
      const data = await resend.emails.send({
        from: "MotionCommerce <security@motioncommerce.com>",
        to: email,
        subject: "Reset your password",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password. If you didn't request this, you can safely ignore this email.</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Password</a>
          </div>
        `,
      });
      return { success: true, data };
    } catch (error) {
      console.error("Failed to send password reset email", error);
      return { success: false, error };
    }
  }
};
