import { Icon } from "@cloudscape-design/components";
import "./CollapsiblePanelStyles.css";
import { useState } from "react";
const CollapsiblePanel = (data: any) => {
  const [isOpen, setIsOpen] = useState(data.isOpen? true :false);
  return (
    <div data-collapsible-panel-main data-collapsible-panel-is-open={isOpen}>
      <div data-collapsible-panel-header onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}>
        <div data-collapsible-panel-header-content>{data?.header}</div>
        <div
          data-collapsible-panel-header-btn
        >
          <div data-collapsible-panel-header-btn-wrapper>
            <Icon name="caret-down-filled" />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div data-collapsible-panel-main-content>{data?.content}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollapsiblePanel;
