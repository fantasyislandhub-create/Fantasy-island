const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || 'Fantasy Island <onboarding@resend.dev>';

const notifyAdminNewBooking = async (booking) => {
  const { guestName, email, phone, suiteTitle, suitePrice, checkInDate, duration, totalAmount, paymentMethod, _id } = booking;

  const checkIn = new Date(checkInDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { background: #0D0202; color: #fff; font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #1a0505; border: 1px solid rgba(196,30,58,0.2); border-radius: 16px; overflow: hidden; }
        .header { background: #C41E3A; padding: 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.3em; text-transform: uppercase; color: #fff; }
        .header p { margin: 6px 0 0; font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 0.2em; text-transform: uppercase; }
        .body { padding: 32px; }
        .alert { background: rgba(196,30,58,0.1); border: 1px solid rgba(196,30,58,0.3); border-radius: 10px; padding: 16px 20px; margin-bottom: 28px; font-size: 13px; color: rgba(255,255,255,0.8); }
        .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); margin-bottom: 12px; font-weight: bold; }
        .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
        .row:last-child { border-bottom: none; }
        .row .label { color: rgba(255,255,255,0.4); }
        .row .value { color: #fff; font-weight: bold; text-align: right; }
        .total-row { padding: 16px 0; display: flex; justify-content: space-between; font-size: 16px; }
        .total-row .label { color: rgba(255,255,255,0.6); }
        .total-row .value { color: #C41E3A; font-weight: bold; }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px 24px; margin-bottom: 20px; }
        .ref { font-size: 10px; color: rgba(255,255,255,0.15); font-family: monospace; text-align: center; margin-top: 24px; }
        .footer { padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 10px; color: rgba(255,255,255,0.15); text-transform: uppercase; letter-spacing: 0.2em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Reservation</h1>
          <p>Payment Confirmation Pending</p>
        </div>
        <div class="body">
          <div class="alert">
            A guest has clicked <strong>"I have made payment"</strong> via <strong>${paymentMethod}</strong>.
            Log into the admin panel to verify the payment and confirm or reject this reservation.
          </div>

          <div class="section-label">Guest Details</div>
          <div class="card">
            <div class="row"><span class="label">Name</span><span class="value">${guestName}</span></div>
            <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
            <div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>
          </div>

          <div class="section-label">Reservation Details</div>
          <div class="card">
            <div class="row"><span class="label">Suite</span><span class="value">${suiteTitle}</span></div>
            <div class="row"><span class="label">Check-in</span><span class="value">${checkIn}</span></div>
            <div class="row"><span class="label">Duration</span><span class="value">${duration} Day${duration > 1 ? 's' : ''}</span></div>
            <div class="row"><span class="label">Payment Method</span><span class="value">${paymentMethod}</span></div>
            <div class="total-row"><span class="label">Total Amount</span><span class="value">$${totalAmount}</span></div>
          </div>

          <div class="ref">Booking REF: ${String(_id).slice(-10).toUpperCase()}</div>

          <div style="text-align:center; margin-top: 24px;">
            <a href="${process.env.ADMIN_PANEL_URL || 'https://fantasyislandhub.com/admin/bookings'}" style="display:inline-block; background:#C41E3A; color:#fff; padding:14px 32px; border-radius:10px; font-size:11px; font-weight:bold; text-transform:uppercase; letter-spacing:0.2em; text-decoration:none;">Open Admin Panel</a>
          </div>
        </div>
        <div class="footer">Fantasy Island &bull; Admin Notification &bull; Please verify payment</div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Booking — ${guestName} · ${suiteTitle} · $${totalAmount}`,
    html,
  });
};

module.exports = { notifyAdminNewBooking };
