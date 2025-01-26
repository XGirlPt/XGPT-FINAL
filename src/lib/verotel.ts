

const shopId: string = process.env.VEROTEL_SHOP_ID!;
const signatureKey: string = process.env.VEROTEL_SIGNATURE_KEY!;
const baseUrl: string = "https://secure.verotel.com/startorder";

export const createPaymentLink = (amount: number, currency: string, userId: string): string => {
  const returnUrl = `https://seusite.com/pagamento/sucesso`;
  const cancelUrl = `https://seusite.com/pagamento/cancelado`;

  return `${baseUrl}?shopID=${shopId}&amount=${amount}&currency=${currency}&description=Pagamento+Anúncio&returnUrl=${returnUrl}&cancelUrl=${cancelUrl}`;
};