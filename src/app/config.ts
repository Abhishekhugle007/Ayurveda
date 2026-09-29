/** Replace with your WhatsApp number: country code + number, no plus sign or spaces. */
export const WHATSAPP_NUMBER = '917722066081';
export const CONSULT_FEE = 499; // placeholder
export const FREE_CONSULT_MIN_ITEMS = 2;
export const PAYMENT_METHODS = [
  { id: 'GPay', label: 'GPay', account: '+91 7722066081', instruction: 'Pay to the GPay number shown below after payment confirmation.', qr: false },
  { id: 'PhonePe', label: 'PhonePe', account: '7722066081@upi', instruction: 'Open PhonePe and pay to this UPI ID.', qr: false },
  { id: 'Paytm', label: 'Paytm', account: '7722066081@paytm', instruction: 'Open Paytm and send the payment to this UPI ID.', qr: false },
  { id: 'QR code', label: 'QR code', account: '7722066081@upi', instruction: 'Scan the QR code and complete the payment.', qr: true },
];
export const UPI_ID = '7722066081@upi';
export const CONCERNS = ['Digestion and gut', 'Skin and hair', 'Stress and sleep', 'Joints and pain', 'Weight and metabolism', "Women's health", 'Other'];
export const TIME_SLOTS = ['Morning (9am to 12pm)', 'Afternoon (12pm to 4pm)', 'Evening (4pm to 8pm)'];
