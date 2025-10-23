export function validateEmail(email) {
  const forbiddenSubstrings = [
    "domain",
    "dummy",
    "example",
    "test",
    "no-reply",
    "noreply",
    "sample",
    "testing",
  ];

  // Regular expression to check general email validity
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if email matches the regex
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }

  // Extract domain from email
  const domain = email.split("@")[1];

  // Check if domain contains any forbidden substring
  for (let substring of forbiddenSubstrings) {
    if (domain.toLowerCase().includes(substring)) {
      return "This email domain is not allowed.";
    }
  }

  return null;
}

// Validate Philippine phone number function supporting spaces and dashes
export function validatePhoneNumber(phone) {
  // Normalize input by removing spaces, dashes, and optional leading plus sign
  const normalizedPhone = phone.replace(/^\+/, "").replace(/[\s-]/g, "");

  // Regex to validate:
  // - local mobile: 09xxxxxxxxx
  // - international mobile: 639xxxxxxxxx (must start with 9 after 63)
  // - landline: 02xxxxxxxx
  const phoneRegex = /^(09\d{9}|63[9]\d{9}|02\d{8})$/;

  return phoneRegex.test(normalizedPhone);
}
