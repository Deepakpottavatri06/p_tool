import React, { useState, useEffect } from "react";
import { Navbar, Collapse, Typography, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SuprSendInbox from "@suprsend/react-inbox";
import axios from 'axios';

const sampleLightTheme = {
  bell: { color: '#0000ff' },
  badge: { backgroundColor: lightColors.primary },
  header: {
    container: {
      backgroundColor: lightColors.main,
      borderBottom: `0.5px solid ${lightColors.border}`,
      boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1)'
    },
    headerText: { color: lightColors.primaryText },
    markAllReadText: { color: lightColors.primary }
  },
  tabs: {
    color: lightColors.primaryText,
    unselectedColor: lightColors.secondaryText + 'D9',
    bottomColor: lightColors.primary,
    badgeColor: 'rgba(0, 123, 255, 0.5)',
    badgeText: lightColors.primaryText
  },
  notificationsContainer: {
    container: {
      backgroundColor: lightColors.main,
      borderColor: lightColors.border
    },
    noNotificationsText: {
      color: lightColors.primaryText
    },
    noNotificationsSubtext: {
      color: lightColors.secondaryText
    },
    loader: { color: lightColors.primary }
  },
  notification: {
    container: {
      borderBottom: `1px solid ${lightColors.border}`,
      readBackgroundColor: lightColors.main,
      unreadBackgroundColor: '#f8f9fa',
      hoverBackgroundColor: '#e9ecef',
    },
    pinnedText: {
      color: lightColors.secondaryText
    },
    pinnedIcon: {
      color: 'red'
    },
    headerText: { color: lightColors.primaryText },
    bodyText: {
      color: lightColors.secondaryText,
      blockquoteColor: 'rgba(0, 123, 255, 0.5)'
    },
    unseenDot: { backgroundColor: lightColors.primary },
    createdOnText: { color: lightColors.secondaryText },
    subtext: { color: '#adb5bd' },
    actions: [
      { container: { backgroundColor: lightColors.primary } },
      {
        container: {
          borderColor: lightColors.border,
          backgroundColor: 'transparent',
          hoverBackgroundColor: lightColors.main
        },
        text: { color: lightColors.secondaryText }
      }
    ],
    expiresText: {
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
      color: lightColors.secondaryText,
      expiringBackgroundColor: 'rgba(220, 53, 69, 0.15)',
      expiringColor: lightColors.error
    },
    actionsMenuIcon: {
      color: lightColors.secondaryText,
      hoverBackgroundColor: 'rgba(0, 123, 255, 0.5)'
    },
    actionsMenu: {
      backgroundColor: lightColors.main,
      borderColor: lightColors.border
    },
    actionsMenuItem: { hoverBackgroundColor: 'rgba(0, 123, 255, 0.2)' },
    actionsMenuItemIcon: { color: lightColors.secondaryText },
    actionsMenuItemText: {
      color: lightColors.secondaryText
    }
  },
  toast: {
    container: {
      backgroundColor: lightColors.main,
      borderColor: lightColors.border,
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 9999,  // Ensure it stays on top
    },
    headerText: { color: lightColors.primaryText },
    bodyText: {
      color: lightColors.secondaryText,
      blockquoteColor: lightColors.border
    }
  }
}

function NavList({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [subscriberId, setSubscriberId] = useState("");

  function logout() {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  useEffect(() => {
    const generateSubscriberId = async () => {
      if (!isAuthenticated) return;
      try {
        let email = sessionStorage.getItem("email");
        const subscriberResponse = await axios.post(
          "https://p-tool-backend.vercel.app/api/subid/subsId_generate",
          { distinct_id: email }
        );
        console.log(subscriberResponse.data);
        setSubscriberId(subscriberResponse.data);
      } catch (err) {
        return;
      }
    };

    generateSubscriberId();
  }, [isAuthenticated]);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {!isAuthenticated && (
        <li className="flex w-full flex-nowrap gap-1">
          <Link to="/login">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="gradient" size="sm" fullWidth>
              Sign up
            </Button>
          </Link>
        </li>
      )}
      {isAuthenticated && (
        <>
          <SuprSendInbox
            theme={sampleLightTheme}
            themeType="light"
            workspaceKey="2PCnwqIEUpVbsOWGKYBn"
            subscriberId={subscriberId}
            distinctId={sessionStorage.getItem("email")}
          />
          <Button variant="gradient" size="sm" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </ul>
  );
}

export default function NavbarSimple({ isAuthenticated, setIsAuthenticated }) {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 my-5">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" variant="h6" className="mr-4 cursor-pointer py-1.5">
          <Link to="/">P-Tool</Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Collapse>
    </Navbar>
  );
}
