import * as crypto from "crypto";

class VerifyWebhook {
  private signingKey: string;

  constructor(signinKey: string) {
    this.signingKey = signinKey;
  }

  verify(timestamp: string, token: string, signature: string): boolean {
    try {
      const encodeSignature: string = crypto
        .createHmac("SHA256", this.signingKey)
        .update(timestamp + token)
        .digest("hex");
      if (encodeSignature === signature) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Verify error ======> ", error);
      return false;
    }
  }
}

export default new VerifyWebhook(process.env.MAILGUN_SIGNINKEY!);
