import React, { useState } from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import awsLogo from "../assets/icons/aws-logo.svg";

import AppLeftNAvPanel from "./AppLeftNavPanel";
import { Outlet } from "react-router-dom";
import { useAppToast } from "../Context/AppGlobalToast";
import { useAuth } from "../Cognito-Auth/AuthContext";

const MainLayout: React.FC = () => {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const { addNewToast } = useAppToast();
  const { signOut, user } = useAuth();
  return (
    <>
      <div data-main-page-scrolling-panel>
        <TopNavigation
          identity={{
            href: "/",
            title: "Clinical Development Assistance",
            logo: { src: awsLogo, alt: "App" },
          }}
          utilities={[
            { type: "button", text: "Help" },
            {
              type: "menu-dropdown",
              text: user?.username || "user",
              title: "Account",
              items: [
                { id: "signout", text: "Sign out" },
              ],
              onItemClick: (event) => {
                switch (event.detail.id) {
                  case "signout": {
                    signOut();
                    setTimeout(() => {
                      addNewToast({
                        type: "SUCCESS",
                        content: "Logged-Out Successfully.",
                      });
                    }, 100);
                  }
                }
              },
            },
          ]}
        />
        <AppLayout
          navigation={<AppLeftNAvPanel />}
          navigationOpen={navigationOpen}
          onNavigationChange={({ detail }) => {
            setNavigationOpen(detail.open);
          }}
          disableContentPaddings
          toolsHide={true}
          content={
            <div
              style={{
                position: "relative",
                padding: "0 20px",
                height: "100%",
              }}
            >
              {/* <MainChatPage /> */}
              <Outlet />
            </div>
          }
        />
      </div>
    </>
  );
};

export default MainLayout;
