import CryptoJS from 'crypto-js';

const secretKey = "jhgbdvdbdjvbdjb^%%jhgdvgdjvhdjvhdhdnvfv65g74rf87r4b"; // must match backend

export const decryptToken = (token, iv) => {
    try {
        // Generate the key from the secret key, same as backend
        const key = CryptoJS.SHA256(secretKey);
        
        // Parse the IV from Base64
        const ivWordArray = CryptoJS.enc.Base64.parse(iv);

        // Decrypt the token
        const decrypted = CryptoJS.AES.decrypt(token, key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Convert decrypted data to UTF-8 string
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        console.log("decryptedString", decryptedString);
        return decryptedString;
    } catch (error) {
        console.error("Failed to decrypt token:", error);
        return null;
    }
};
