import CryptoJS from "crypto-js";

// NEW: Password ko AES se encrypt karne ka function
function encryptPassword({ password, secretKey }) {
  if (secretKey) {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  return false;
}

export default encryptPassword;
