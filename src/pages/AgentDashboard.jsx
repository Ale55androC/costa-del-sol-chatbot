import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import ChatInterface from '../components/chat/ChatInterface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AgentDashboard = () => {
  return (
    <AppLayout userType="Agent">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects, information..."
            className="w-full p-3 pl-10 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Project Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <img
                src={`https://picsum.photos/400/300?random=${i}`}
                alt="Project"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-primary">Luxury Villa {i}</h3>
              <p className="text-gray-600">Costa del Sol, Spain</p>
              <button className="mt-4 text-secondary hover:text-secondary-light">
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <ChatInterface userType="Agent" />
      </div>
    </AppLayout>
  );
};

export default AgentDashboard;
