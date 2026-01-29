import "./CollapsiblePanelStyles.css";
import { useState } from "react";
import CollapsibleItemRow from "./CollapsibleItem.tsx";
const CollapsiblePanel = (data: any) => {
  const [currentPanelId, setCurrentPanelId] = useState("");

  return (
    <>
      {data?.content?.map((item: any,index:number) => {
        return (
          <CollapsibleItemRow
            key={index}
            item={item}
            currentPanelId={currentPanelId}
            setCurrentPanelId={setCurrentPanelId}
          />
        );
      })}
    </>
  );
};

export default CollapsiblePanel;
