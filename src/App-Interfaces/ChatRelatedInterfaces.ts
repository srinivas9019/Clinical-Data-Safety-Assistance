export const ChatMsgIOTypes = {
    INCOMING: "Incoming",
    OUTGOING: "Outgoing",
}
export const UserTypes = {
    USER:"user",
    ASSISTANT:"assistant"
}
export type ChatMsgIOKeys = typeof ChatMsgIOTypes[keyof typeof ChatMsgIOTypes];

export const ChatMsgPanelTypes = {
  SUMMARY : "Summary",
  OUTPUT_CONTAINER:"OutputContainer",
  KPIS:"Kpis",
  VALUE_CURRENCY:"VALUE_CURRENCY",
  VALUE_PERCENT:"VALUE_PERCENT",
  GRID_PANEL:"grid_panel",
  BAR_CHART:"Bar_Chart",
  LINE_CHART:"Line_Chart",
  CONTAINER_PANEL:"Container_panel",
  SPACE_BETWEEN:"Space_Between"
}





export type AppPageKeys = typeof ChatMsgPanelTypes[keyof typeof ChatMsgPanelTypes];
