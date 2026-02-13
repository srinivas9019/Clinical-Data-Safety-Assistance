import { Box } from "@cloudscape-design/components";
import "./panelLoader.css";
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