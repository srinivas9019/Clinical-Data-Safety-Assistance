// API endpoint from environment variable or default

import {
  BedrockAgentCoreClient,
  InvokeAgentRuntimeCommand,
} from "@aws-sdk/client-bedrock-agentcore"; // ES Modules import
import { config } from "./config";

export const getPromptResult = async (input_text: string, session_id: any) => {
  const client = new BedrockAgentCoreClient(config);

  const input = {
    runtimeSessionId: session_id, // Must be 33+ chars
    agentRuntimeArn: import.meta.env.VITE_API_CHAT_URL,
    payload: JSON.stringify({ prompt: input_text }), //new TextEncoder().encode(input_text), // e.g. Buffer.from(input_text) or new TextEncoder().encode(input_text)   // required
  };

  try {
    const command = new InvokeAgentRuntimeCommand(input);
    const response = await client.send(command);
    const apiResponse = await response.response.transformToString();

    if (apiResponse) {
      try {
        return {
          message: "",
          result: JSON.parse(apiResponse),
        };
      } catch (error) {
        return {
          message:
            "Error Occurred in processing request please try after sometime.",
          result: null,
        };
      }
    } else {
      return {
        message:
          apiResponse?.message ??
          "Error Occurred in processing request please try after sometime.",
        result: null,
      };
    }
  } catch (error) {
    return {
      message: "Error in connecting with agent please try again.",
      result: null,
    };
  }
};
