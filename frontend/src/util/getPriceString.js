export function getPriceString(price) {
  return price.toLocaleString("en-GB", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
}
