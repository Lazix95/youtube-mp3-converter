import React from 'react';
import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { SharedDefaultFooter } from '../../components/SharedDefaultFooter/SharedDefaultFooter';
import { IconButton } from '@mui/material';
import { getNamedChild } from '@cv-app/shared/shared-fnc';
import { SharedHocIf } from '@cv-app/shared/shared-hoc';

interface SharedMainLayoutProps {
  readonly children: ReactNode;
  readonly drawerValue?: boolean;
  readonly onDrawerChange?: (state: boolean) => void;
  readonly Footer?: () => JSX.Element;
  readonly UpperNavList?: (() => JSX.Element) | undefined;
  readonly LowerNavList?: (() => JSX.Element) | undefined;
  readonly Drawer?: (() => JSX.Element) | undefined;
}

export function SharedMainLayout({ children, Footer = SharedDefaultFooter, UpperNavList, LowerNavList, ...rest }: SharedMainLayoutProps) {
  const Drawer = getNamedChild(children, 'drawer');

  const showUpper = UpperNavList !== undefined;
  const showLower = LowerNavList !== undefined;
  const showDrawer = Drawer !== undefined;

  function handleDrawerChange(state: boolean) {
    rest.onDrawerChange?.(state);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position={'sticky'} elevation={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: 'wrap', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>

          <SharedHocIf RIf={showUpper}>
            <nav>{showUpper && <UpperNavList />}</nav>
          </SharedHocIf>

          <SharedHocIf RIf={showDrawer}>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={() => handleDrawerChange(!rest.drawerValue)}>
              <MenuIcon />
            </IconButton>
            {showDrawer && Drawer}
          </SharedHocIf>
        </Toolbar>

        <SharedHocIf RIf={showLower}>
          <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
            <nav>{showLower && <LowerNavList />}</nav>
          </Toolbar>
        </SharedHocIf>
      </AppBar>

      {/* Main view */}
      <main style={{ paddingLeft: 0, paddingRight: 0 }}>{children}</main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
