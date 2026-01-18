import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppLayout from "@cloudscape-design/components/app-layout";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import type { SideNavigationProps } from "@cloudscape-design/components/side-navigation";

import awsLogo from "../assets/icons/aws-logo.svg";
import MainChatPage from "../pages/MainChatPage";

const MainLayout: React.FC = () => {
  const [navigationOpen, setNavigationOpen] = useState(true);

  return (
    <>
      <div data-main-page-scrolling-panel>
        <TopNavigation
          identity={{
            href: "/",
            title: "Clinical Data Safety Assistance",
            logo: { src: awsLogo, alt: "App" },
          }}
          utilities={[
            { type: "button", text: "Help" },
            {
              type: "menu-dropdown",
              text: "user",
              title: "Account",
              items: [{ id: "signout", text: "Sign out" }],
            },
          ]}
        />
        <AppLayout
          navigation={
            <SideNavigation
              activeHref={location.pathname}
              header={{ text: "Menu", href: "/" }}
            />
          }
          navigationOpen={navigationOpen}
          onNavigationChange={({ detail }) => {
            setNavigationOpen(detail.open);
          }}
          toolsHide={true}
          content={
            <div
              style={{ position: "relative", height: "100%", padding: "0 6px" }}
            >
              <MainChatPage />
            </div>
          }
        />
      </div>
    </>
  );
};

export default MainLayout;
