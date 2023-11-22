import "../styles/header.scss";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@apollo/client";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useStoreContext } from "../utils/store";
import {
  UPDATE_USER,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";
import { QUERY_AUTHENTICATE, QUERY_CATEGORIES } from "../utils/queries";
import { LOGOUT } from "../utils/mutations";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [state, dispatch] = useStoreContext();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const navigate = useNavigate();
  const [logoutUser] = useMutation(LOGOUT, {
    refetchQueries: [QUERY_AUTHENTICATE],
  });

  const logout = async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
      dispatch({
        type: UPDATE_USER,
        user: null,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    } else if (!loading) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categories,
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const navigation = categoryData?.categories || [];

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-6 sm:px-6 lg:px-16">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to="/" className="flex items-center px-1">
                    <img className="h-8 w-auto" src={'/images/logo.png'} alt="Your Company" />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block justify-center">
                  <div className="flex justify-center items-center space-x-4 mx-auto">
                    {navigation.map((item) => (
                      <NavLink
                        key={item._id}
                        to="/products"
                        onClick={() => {
                          handleClick(item._id);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {state.user ? (
                  <>
                    <p className="welcome mr-3">
                      Welcome, {state.user.firstName}
                    </p>

                    {state.user.orders.length > 0 ? (
                      <NavLink
                        to="/order-history"
                        className="hidden md:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Order History
                      </NavLink>
                    ) : (
                      ""
                    )}
                    <NavLink
                      to="/logout"
                      onClick={logout}
                      className="hidden md:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Log Out
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="hidden md:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="hidden md:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to="/products"
                  onClick={() => {
                    handleClick(item._id);
                  }}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              {state.user ? (
                <>
                  <NavLink
                    to="/logout"
                    onClick={logout}
                    className="mt-10 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-small"
                  >
                    Log Out
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="mt-10 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-small"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="mt-10 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-small"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default Header;
