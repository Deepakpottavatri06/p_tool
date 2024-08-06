import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function NavList({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("token"); // Ensure you use sessionStorage consistently
    setIsAuthenticated(false); // This should update the authentication state
    navigate("/login");
  }

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
        <Button variant="gradient" size="sm" onClick={logout}>
          Logout
        </Button>
      )}
    </ul>
  );
}

export default function NavbarSimple({ isAuthenticated, setIsAuthenticated }) {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 my-5">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          <Link to="/">
            P-Tool
          </Link>
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
