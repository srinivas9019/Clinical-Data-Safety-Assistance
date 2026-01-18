export const checkIsNumber = (value: any) => {
  return value !== "" && value !== undefined && typeof value !== "undefined";
};

export const formatCurrency = (value: any) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\$/g, "");
};

export const allowOnlyNumbers = (value: string) =>
  /^(\d+)?(\.)?(\d{0,2})?$/.test(value.toString());

export const floorToDecimals = (num: number, fixLimit = 2): number => {
  return parseFloat((Math.floor(num * 100) / 100).toFixed(fixLimit));
};
export const ceilToDecimals = (num: number, fixLimit = 2) => {
  return (Math.floor(num * 100) / 100).toFixed(fixLimit);
};
