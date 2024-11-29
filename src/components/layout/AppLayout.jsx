import React from 'react';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const AppLayout = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral">
      {/* Top Navigation */}
      <nav className="bg-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-primary-light"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <h1 className="text-xl font-semibold">Costa del Sol {userType} Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {userType}</span>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="h-full p-4">
            <div className="space-y-4">
              <div className="pt-16 lg:pt-0">
                {userType === 'Agent' ? (
                  <>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Projects
                    </button>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Delivery Dates
                    </button>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Draft Email
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Dashboard
                    </button>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Project Updates
                    </button>
                    <button className="w-full p-3 text-left rounded-md hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary">
                      Email Templates
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
