// /api/orders/[id]/capture.js

export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
  
    const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${id}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      }
    });
  
    const data = await response.json();
    if (!response.ok) {
      console.error('PayPal Capture Error:', data);
      return res.status(500).json({ error: 'Failed to capture payment' });
    }
  
    res.status(200).json(data);
  }
  