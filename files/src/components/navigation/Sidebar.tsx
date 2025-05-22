import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { X, Home, School, Calendar, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-72 max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                          Menu
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onClick={onClose}
                        >
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex-1 px-4 sm:px-6">
                      <nav className="flex flex-col space-y-2">
                        <Link
                          to="/"
                          onClick={onClose}
                          className="flex items-center space-x-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Home className="h-5 w-5" />
                          <span>Home</span>
                        </Link>
                        <Link
                          to="/classrooms"
                          onClick={onClose}
                          className="flex items-center space-x-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <School className="h-5 w-5" />
                          <span>Classrooms</span>
                        </Link>
                        <Link
                          to="/reservations"
                          onClick={onClose}
                          className="flex items-center space-x-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Calendar className="h-5 w-5" />
                          <span>My Reservations</span>
                        </Link>

                        <div className="pt-6 mt-6 border-t border-gray-200">
                          <div className="flex items-center px-3 py-2">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">U</span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-700">User</p>
                              <p className="text-xs text-gray-500">user@example.com</p>
                            </div>
                          </div>

                          <div className="mt-2 space-y-2">
                            <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                              <Settings className="h-5 w-5" />
                              <span>Settings</span>
                            </button>
                            <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                              <LogOut className="h-5 w-5" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;