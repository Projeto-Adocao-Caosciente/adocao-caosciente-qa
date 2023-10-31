function generateRandomPassword() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "!@#$%&";
  const numberChars = "0123456789";

  const allChars = uppercaseChars + lowercaseChars + specialChars + numberChars;

  let password = "";
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];

  for (let i = 4; i < 10; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

export default { generateRandomPassword };
