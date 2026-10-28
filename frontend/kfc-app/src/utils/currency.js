export const parsePrice = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? value : null;
  }

  const cleaned = String(value).replace(/[^\d.-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") {
    return null;
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

export const formatUGX = (value) => {
  const amount = parsePrice(value);

  if (amount === null) {
    return "Price to be confirmed";
  }

  return `UGX ${Math.round(amount).toLocaleString("en-UG")}`;
};

export const isPriceAvailable = (value) => {
  return parsePrice(value) !== null;
};
