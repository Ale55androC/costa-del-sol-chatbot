import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

// Sample property data
const sampleProperties = {
  "Villa Marbella Seaview": {
    ref: "MLG1234",
    price: "€3,950,000",
    location: "Golden Mile, Marbella",
    size: "650 m²",
    plot: "1,200 m²",
    bedrooms: 5,
    bathrooms: 6,
    description: "Luxurious contemporary villa with panoramic sea views, featuring an infinity pool, home cinema, and wine cellar.",
    features: ["Sea Views", "Private Pool", "Home Cinema", "Wine Cellar", "Smart Home", "24h Security"]
  },
  "Puente Romano Penthouse": {
    ref: "MLG5678",
    price: "€4,800,000",
    location: "Puente Romano, Marbella",
    size: "400 m²",
    plot: "N/A",
    bedrooms: 4,
    bathrooms: 4,
    description: "Exclusive penthouse in the prestigious Puente Romano resort, offering luxury amenities and direct beach access.",
    features: ["Beachfront", "Resort Amenities", "Terrace", "Sea Views", "Concierge Service"]
  }
};

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

const BookingForm = ({ onSubmit, propertyName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeSelect = (time) => {
    if (formData.name && formData.email && formData.phone) {
      setSelectedTime(time);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    onSubmit({ ...formData, time: selectedTime });
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="bg-white rounded-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-serif text-primary">Confirm Viewing Request</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="font-medium text-gray-700">Please confirm your viewing request:</p>
          <div className="space-y-2">
            <p><span className="font-medium">Property:</span> {propertyName}</p>
            <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
            <p><span className="font-medium">Time:</span> {selectedTime}</p>
            <p><span className="font-medium">Name:</span> {formData.name}</p>
            <p><span className="font-medium">Email:</span> {formData.email}</p>
            <p><span className="font-medium">Phone:</span> {formData.phone}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Confirm Booking
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          * A real estate agent will review your request and contact you to confirm the viewing.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
      <h3 className="text-xl font-serif text-primary">Schedule a Viewing - {propertyName}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600 mb-2">Select preferred viewing time:</p>
        <div className="grid grid-cols-2 gap-2">
          {['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`p-2 rounded-lg transition-colors ${
                !formData.name || !formData.email || !formData.phone
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        {(!formData.name || !formData.email || !formData.phone) && (
          <p className="text-sm text-red-500 mt-2">
            * Please fill in all fields before selecting a time
          </p>
        )}
      </div>
    </div>
  );
};

const BrochureRequestForm = ({ onSubmit, propertyName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
      <h3 className="text-xl font-serif text-primary">Request Property Brochure - {propertyName}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={!formData.name || !formData.email}
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            !formData.name || !formData.email
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          Request Brochure
        </button>
      </div>
      {(!formData.name || !formData.email) && (
        <p className="text-sm text-red-500 mt-2">
          * Please provide your name and email to receive the brochure
        </p>
      )}
    </div>
  );
};

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Display property details
  const showPropertyDetails = (propertyName) => {
    const property = sampleProperties[propertyName];
    
    const message = {
      type: 'bot',
      content: (
        <div className="space-y-4">
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"
              alt={propertyName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-serif">{propertyName}</h3>
              <p className="text-lg">{property.price}</p>
              <p className="text-sm opacity-90">{property.location}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">Ref: {property.ref}</span>
              <div className="flex gap-4">
                <button
                  onClick={() => showSchedulingForm(propertyName)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Schedule Viewing
                </button>
                <button
                  onClick={() => showBrochureForm(propertyName)}
                  className="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Request Brochure
                </button>
              </div>
            </div>

            <p className="text-gray-600">{property.description}</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-primary mb-2">Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Built Size: {property.size}</li>
                  <li>Plot: {property.plot}</li>
                  <li>Bedrooms: {property.bedrooms}</li>
                  <li>Bathrooms: {property.bathrooms}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent/20 text-primary rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    };

    setChatHistory(prev => [...prev, message]);
  };

  // Show scheduling form
  const showSchedulingForm = (propertyName) => {
    const handleBookingSubmit = (formData) => {
      scheduleViewing(propertyName, formData.time, formData);
    };

    const message = {
      type: 'bot',
      content: <BookingForm onSubmit={handleBookingSubmit} propertyName={propertyName} />
    };

    setChatHistory(prev => [...prev, message]);
  };

  // Show brochure request form
  const showBrochureForm = (propertyName) => {
    const handleBrochureSubmit = (formData) => {
      sendBrochure(propertyName, formData);
    };

    const message = {
      type: 'bot',
      content: <BrochureRequestForm onSubmit={handleBrochureSubmit} propertyName={propertyName} />
    };

    setChatHistory(prev => [...prev, message]);
  };

  // Schedule viewing
  const scheduleViewing = async (propertyName, time, formData) => {
    const property = sampleProperties[propertyName];
    
    try {
      console.log('Submitting viewing request:', {
        propertyName,
        time,
        formData
      });

      const webhookData = {
        type: 'viewing',
        property: {
          name: propertyName,
          ref: property.ref,
          location: property.location,
          price: property.price
        },
        client: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        viewing: {
          time: time,
          date: new Date().toLocaleDateString(),
          status: 'pending_confirmation'
        }
      };

      console.log('Webhook payload:', webhookData);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(webhookData)
      });

      console.log('Webhook response:', response);

      const message = {
        type: 'bot',
        content: (
          <div className="bg-white rounded-lg p-4">
            <p className="text-green-600 font-medium">✓ Viewing request submitted successfully!</p>
            <div className="text-gray-600 mt-2 space-y-2">
              <p>Your viewing request has been submitted with the following details:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Property: {propertyName}</li>
                <li>Date: {new Date().toLocaleDateString()}</li>
                <li>Time: {time}</li>
                <li>Name: {formData.name}</li>
                <li>Email: {formData.email}</li>
                <li>Phone: {formData.phone}</li>
              </ul>
              <p className="mt-2 text-sm bg-blue-50 p-3 rounded-lg">
                A real estate agent will review your request and contact you shortly to confirm the viewing.
                Please note that the viewing is not confirmed until you receive confirmation from our team.
              </p>
            </div>
          </div>
        )
      };

      setChatHistory(prev => [...prev, message]);
    } catch (error) {
      console.error('Error scheduling viewing:', error);
      
      const message = {
        type: 'bot',
        content: (
          <div className="bg-white rounded-lg p-4">
            <p className="text-red-500 font-medium">Unable to submit viewing request</p>
            <p className="text-gray-600 mt-2">
              We're having trouble submitting your viewing request. Please try again or contact us directly at:
              <a href="tel:+34123456789" className="block mt-2 text-primary hover:underline">+34 123 456 789</a>
              <a href="mailto:info@costadelsol.com" className="block text-primary hover:underline">info@costadelsol.com</a>
            </p>
          </div>
        )
      };

      setChatHistory(prev => [...prev, message]);
    }
  };

  // Send property brochure
  const sendBrochure = async (propertyName, formData) => {
    const property = sampleProperties[propertyName];
    
    try {
      const webhookData = {
        type: 'brochure',
        property: {
          name: propertyName,
          ref: property.ref,
          ...property
        },
        client: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || ''
        }
      };

      console.log('Sending brochure request:', webhookData);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(webhookData)
      });

      console.log('Brochure request response:', response);

      const message = {
        type: 'bot',
        content: (
          <div className="bg-white rounded-lg p-4">
            <p className="text-green-600 font-medium">✓ Brochure request sent successfully!</p>
            <div className="text-gray-600 mt-2 space-y-2">
              <p>We'll send a detailed property brochure to {formData.email} with information about:</p>
              <ul className="list-disc list-inside pl-4">
                <li>{propertyName}</li>
                <li>Reference: {property.ref}</li>
                <li>Full specifications and features</li>
                <li>High-resolution photos</li>
                <li>Location details and amenities</li>
              </ul>
              <p className="text-sm mt-2">Please check your email shortly. If you don't receive the brochure, please check your spam folder.</p>
            </div>
          </div>
        )
      };

      setChatHistory(prev => [...prev, message]);
    } catch (error) {
      console.error('Error sending brochure:', error);
      
      const message = {
        type: 'bot',
        content: (
          <div className="bg-white rounded-lg p-4">
            <p className="text-red-500 font-medium">Unable to send brochure</p>
            <p className="text-gray-600 mt-2">
              We're having trouble sending the brochure. Please try again or contact us directly at:
              <a href="mailto:info@costadelsol.com" className="block mt-2 text-primary hover:underline">info@costadelsol.com</a>
            </p>
          </div>
        )
      };

      setChatHistory(prev => [...prev, message]);
    }
  };

  // Welcome message
  useEffect(() => {
    const welcome = {
      type: 'bot',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Welcome! Select a property to view details:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(sampleProperties).map((propertyName) => (
              <button
                key={propertyName}
                onClick={() => showPropertyDetails(propertyName)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <BuildingOfficeIcon className="w-5 h-5" />
                <span>{propertyName}</span>
              </button>
            ))}
          </div>
        </div>
      )
    };

    setChatHistory([welcome]);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl ${message.type === 'user' ? 'bg-primary text-white' : ''}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setInputMessage('')}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            onClick={() => setInputMessage('')}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
