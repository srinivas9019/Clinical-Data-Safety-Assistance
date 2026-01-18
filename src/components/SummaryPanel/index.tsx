import { Box } from "@cloudscape-design/components";
import summaryIcon from "./../../assets/icons/summary-icon.svg";
import { useEffect, useRef, useState } from "react";
import "./SummaryStyles.css";
export const SummaryPanel = ({
  title,
  description,
  expandShowMore = false,
  hideHeader = false,
}: {
  title?: any;
  description: any;
  expandShowMore?: boolean;
  hideHeader?: boolean;
}) => {
  const refElement = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [expandPanel, setExpandPanel] = useState<boolean>(false);

  useEffect(() => {
    setExpandPanel(expandShowMore);
  }, [expandShowMore]);

  useEffect(() => {
    handleShowMore();
  }, []);
  useEffect(() => {
    handleShowMore();
  }, [description]);

  const handleShowMore = () => {
    if (
      refElement?.current &&
      refElement?.current?.scrollHeight > refElement?.current?.clientHeight
    ) {
      setShowMore(true);
      setExpandPanel(false);
    }
  };

  return (
    <Box data-summary-container>
      {hideHeader ? (
        <></>
      ) : (
        <p data-summary-title data-font-ember-bold>
          <span>
            <img src={summaryIcon} alt="summary" />
          </span>
          {title || "Summary"}
        </p>
      )}

      <Box
        data-summary-panel-description-container
        {...(expandPanel ? { "data-summary-show-full-height": true } : "")}
      >
        <p ref={refElement} title={description}>
          {description || "No Summary Available."}
          {showMore ? (
            <span
              data-summary-panel-show-more
              data-font-ember-bold
              onClick={() => {
                setExpandPanel((preVVal) => !preVVal);
              }}
            >
              {!expandPanel ? "...Show More" : "...Show Less"}
            </span>
          ) : (
            <></>
          )}
        </p>
      </Box>
    </Box>
  );
};
