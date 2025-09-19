export function validateEmail(email) {
  const forbiddenSubstrings = [
    'domain', 'dummy', 'example', 'test', 'no-reply', 'noreply'
  ];

  // Regular expression to check general email validity
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if email matches the regex
  if (!emailRegex.test(email)) {
    return 'Invalid email format.';
  }

  // Extract domain from email
  const domain = email.split('@')[1];

  // Check if domain contains any forbidden substring
  for (let substring of forbiddenSubstrings) {
    if (domain.toLowerCase().includes(substring)) {
      return 'This email domain is not allowed.';
    }
  }

  return null;
}

// Validate Philippine phone number function
export function validatePhoneNumber(phone) {
  // Regular expression for Philippine phone numbers (Mobile and Landline)
  const phoneRegex = /^(09\d{9}|02\d{8})$/;

  // Test the phone number against the regex pattern
  return phoneRegex.test(phone);
}
