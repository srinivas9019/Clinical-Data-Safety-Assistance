import { Icon } from "@cloudscape-design/components";
import "./CollapsiblePanelStyles.css";
import { useEffect, useState } from "react";
const CollapsibleItemRow = (data: any) => {
  const { currentPanelId, setCurrentPanelId, item } = data;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(currentPanelId, item.rowId);
    if (currentPanelId === item.rowId) {
      setIsOpen((prevState) => {
        console.log(prevState);
        return !prevState;
      });
    } else {
      setIsOpen(false);
    }
  }, [currentPanelId]);

  return (
    <div data-collapsible-panel-main data-collapsible-panel-is-open={isOpen}>
      <div
        data-collapsible-panel-header
        onClick={() => {
          if (currentPanelId === item.rowId) {
            setIsOpen((prevState) => !prevState);
          }
          setCurrentPanelId(item.rowId);
        }}
      >
        <div data-collapsible-panel-header-content>{item?.header}</div>
        <div data-collapsible-panel-header-btn>
          <div data-collapsible-panel-header-btn-wrapper>
            <Icon name="caret-down" />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div data-collapsible-panel-main-content>{item?.content}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollapsibleItemRow;
