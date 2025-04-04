const axios = require("axios");

async function ffstalk(userId) {
  try {
    const data = {
      "voucherPricePoint.id": 8050,
      "voucherPricePoint.price": "",
      "voucherPricePoint.variablePrice": "",
      "email": "",
      "n": "",
      "userVariablePrice": "",
      "order.data.profile": "",
      "user.userId": userId,
      "voucherTypeName": "FREEFIRE",
      "affiliateTrackingId": "",
      "impactClickId": "",
      "checkoutId": "",
      "tmwAccessToken": "",
      "shopLang": "in_ID",
    };

    const ff = await axios({
      method: "POST",
      url: "https://order.codashop.com/id/initPayment.action",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data,
    });

    const nickname = ff.data?.confirmationFields?.roles?.[0]?.role;

    if (!nickname) {
      throw new Error("Failed to fetch nickname.");
    }

    return {
      creator: "Empire Tech",
      id: userId,
      nickname,
    };
  } catch (error) {
    return {
      creator: "Empire Tech",
      id: userId,
      error: "User not found or request failed",
    };
  }
}

module.exports = { ffstalk };