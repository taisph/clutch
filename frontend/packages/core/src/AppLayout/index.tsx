import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid as MuiGrid } from "@mui/material";

import type { AppConfiguration } from "../AppProvider";
import Loadable from "../loading";

import Drawer from "./drawer";
import Header, { APP_BAR_HEIGHT } from "./header";

const AppGrid = styled(MuiGrid)({
  flex: 1,
});

const ContentGrid = styled(MuiGrid)({
  flex: 1,
  maxHeight: `calc(100vh - ${APP_BAR_HEIGHT})`,
});

const MainContent = styled.div({ overflowY: "auto", width: "100%" });

interface AppLayoutProps {
  isLoading?: boolean;
  configuration?: AppConfiguration;
  header?: React.ReactElement<any>;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  isLoading = false,
  configuration = {},
  header = null,
}) => {
  return (
    <AppGrid container direction="column" data-testid="app-layout-component">
      {header && React.cloneElement(header, { ...configuration, ...header.props })}
      {!header && <Header {...configuration} />}
      <ContentGrid container wrap="nowrap">
        {isLoading ? (
          <Loadable isLoading={isLoading} variant="overlay" />
        ) : (
          <>
            <Drawer />
            <MainContent>
              <Outlet />
            </MainContent>
          </>
        )}
      </ContentGrid>
    </AppGrid>
  );
};

export default AppLayout;
