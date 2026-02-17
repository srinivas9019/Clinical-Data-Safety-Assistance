import { Box } from "@cloudscape-design/components";

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

export const getNewChatSessionId = (idLength = 13) => {
  const min = Math.pow(10, idLength - 1); // smallest number with 'digits' digits
  const max = Math.pow(10, idLength) - 1; // largest number with 'digits' digits
  const id = Math.floor(min + Math.random() * (max - min + 1));
  return id.toString(); // store as string to avoid precision issues
};
export const generateSessionId = (length = 34) => {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let b of bytes) {
    result += chars[b % chars.length];
  }
  return result;
};

export const PanelLoader = ({
  title,
  maskType = "Dark",
  onlyText = false,
}: {
  title?: any;
  maskType?: "Dark" | "White";
  onlyText?: boolean;
}) => {
  // data-container-with-loader
  return (
    <Box data-panel-loader>
      <Box
        data-loader-mask
        data-loader-light-mask={maskType === "White" ? true : false}
      ></Box>
      <Box data-rotating-loader-with-text>
        {onlyText ? <></> : <Box data-rotating-loader></Box>}
        {title?.length ? (
          <Box data-loader-panel-title-container>
            <p
              data-font-ember-bold
              data-loader-panel-title
              data-loader-panel-title-white-bck={
                maskType === "White" ? true : false
              }
            >
              {title}
            </p>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
