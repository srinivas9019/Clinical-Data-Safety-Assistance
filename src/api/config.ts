const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY || "";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "";

export const config = {
  // AWS_ACCESS_KEY_ID :ACCESS_KEY,
  // AWS_SECRET_ACCESS_KEY : SECRET_KEY,
  region: "us-east-1",
  credentials: {
    accessKeyId: ACCESS_KEY, // replace with your actual access key
    secretAccessKey: SECRET_KEY,
    // sessionToken: "YOUR_SESSION_TOKEN",  // if using temporary credentials
  },
};

export const appUrls: any = {
  COGNITO_CREDENTIALS:
    "https://3lr0gm2653.execute-api.us-east-1.amazonaws.com/v1/cognito-config",
    ALL_CHAT_HISTORY:"https://u1ttycvoeb.execute-api.us-east-1.amazonaws.com/v1/sessions?user_id=CDA_Test_user",
    NEW_CHAT_SESSION:"	https://u1ttycvoeb.execute-api.us-east-1.amazonaws.com/v1/sessions",
    DELETE_CHAT_SESSION:"https://u1ttycvoeb.execute-api.us-east-1.amazonaws.com/v1/sessions/",
    SINGLE_CHAT:"https://u1ttycvoeb.execute-api.us-east-1.amazonaws.com/v1/sessions/",
    SAVE_MESSAGE:"https://u1ttycvoeb.execute-api.us-east-1.amazonaws.com/v1/sessions/"
};
