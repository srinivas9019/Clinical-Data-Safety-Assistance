

export const config = {
  region: "us-east-1",
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
