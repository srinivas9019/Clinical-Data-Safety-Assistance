import { Box } from "@cloudscape-design/components";
import { useState } from "react";
import "./ToastStyles.css"

const ToastPopup = (props: any) => {
  const [addToastPanel, setAddToastPanel] = useState<boolean>(true);

  return (
    <>
      {addToastPanel ? (
        <Box
          data-toast-popup-main
          {...(props?.type === "SUCCESS" || props?.type === "Loading"
            ? { "data-toast-popup-green": true }
            : { "data-toast-popup-error": true })}
        >
          <Box>
            <p data-toast-popup-title data-font-ember-bold>
              {props?.type === "SUCCESS" || props?.type === "Loading"
                ? props?.type === "Loading" ? "Loading..." : "Success !!"
                : "Error Occurred !!"}
            </p>
            <p>{props?.content}</p>
          </Box>
          <div
            {...(props?.type === "SUCCESS" || props?.type === "Loading"
              ? { "data-toast-popup-text-green": true }
              : { "data-toast-popup-text-error": true })}
            onClick={() => {
              setAddToastPanel(false);
            }}
            data-toast-popup-close
          >
            X
          </div>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
export default ToastPopup;
