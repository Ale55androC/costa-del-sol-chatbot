import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import ChatInterface from '../components/chat/ChatInterface';
import { ChartBarIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  return (
    <AppLayout userType="Admin">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <ChartBarIcon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-gray-600">Active Projects</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-8 w-8 text-accent" />
              <div>
                <p className="text-gray-600">Pending Emails</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-gray-600">Updates Needed</p>
                <p className="text-2xl font-semibold">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-neutral rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <p className="text-gray-800">Project update requested for Villa Marina</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface userType="Admin" />
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
