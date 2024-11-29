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
    phone: '',
    notes: '',
    date: '',
    time: ''
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (formData.name && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const getAvailableTimes = () => {
    return [
      '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
    ];
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handleSubmit = () => {
    if (formData.date && formData.time) {
      onSubmit(formData);
    }
  };

  const FormStep1 = () => (
    <div className="bg-white rounded-2xl p-8 shadow-medium space-y-6 animate-fade-in" onClick={e => e.stopPropagation()}>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl text-primary">Schedule Property Viewing</h3>
        <p className="text-neutral-500">{propertyName}</p>
        <p className="text-sm text-neutral-600">Enter client details below to schedule a viewing</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Client Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Enter client's full name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Client Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Enter client's email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Client Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="+34 XXX XXX XXX"
            pattern="^\+?[0-9\s-()]{9,}$"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Additional Notes</label>
          <textarea
            value={formData.notes || ''}
            onChange={e => handleInputChange('notes', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Any special requirements or preferences"
            rows="3"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleNext}
          disabled={!formData.name || !formData.email || !formData.phone}
          className={`w-full py-3 px-6 rounded-xl text-white transition-all transform hover:scale-[1.02] ${
            !formData.name || !formData.email || !formData.phone
              ? 'bg-neutral-200 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark shadow-soft hover:shadow-medium'
          }`}
        >
          Continue to Select Time
        </button>
        {(!formData.name || !formData.email || !formData.phone) && (
          <p className="text-sm text-red-500 mt-2 text-center">
            * Please provide all required client information
          </p>
        )}
      </div>
    </div>
  );

  const FormStep2 = () => (
    <div className="bg-white rounded-2xl p-8 shadow-medium space-y-6 animate-fade-in" onClick={e => e.stopPropagation()}>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl text-primary">Select Viewing Time</h3>
        <p className="text-neutral-500">{propertyName}</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Select Date</label>
          <select
            value={formData.date}
            onChange={e => handleInputChange('date', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Choose a date</option>
            {getAvailableDates().map(date => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long'
                })}
              </option>
            ))}
          </select>
        </div>

        {formData.date && (
          <div className="space-y-2 animate-fade-in">
            <label className="block text-sm font-medium text-neutral-700">Select Time</label>
            <div className="grid grid-cols-3 gap-3">
              {getAvailableTimes().map(time => (
                <button
                  key={time}
                  onClick={() => handleInputChange('time', time)}
                  className={`p-3 rounded-xl border transition-all transform hover:scale-[1.02] ${
                    formData.time === time
                      ? 'bg-primary text-white border-primary shadow-soft'
                      : 'border-neutral-200 hover:border-primary hover:shadow-soft'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => setStep(1)}
          className="w-1/2 py-3 px-6 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.date || !formData.time}
          className={`w-1/2 py-3 px-6 rounded-xl text-white transition-all transform hover:scale-[1.02] ${
            !formData.date || !formData.time
              ? 'bg-neutral-200 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark shadow-soft hover:shadow-medium'
          }`}
        >
          Schedule Viewing
        </button>
      </div>
      {(!formData.date || !formData.time) && (
        <p className="text-sm text-red-500 text-center">
          * Please select both a date and time for your viewing
        </p>
      )}
    </div>
  );

  return step === 1 ? <FormStep1 /> : <FormStep2 />;
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
    <div className="bg-white rounded-2xl p-8 shadow-medium space-y-6 animate-fade-in" onClick={e => e.stopPropagation()}>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl text-primary">Request Property Brochure</h3>
        <p className="text-neutral-500">{propertyName}</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Phone Number (Optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={!formData.name || !formData.email}
          className={`w-full py-3 px-6 rounded-xl text-white transition-all transform hover:scale-[1.02] ${
            !formData.name || !formData.email
              ? 'bg-neutral-200 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark shadow-soft hover:shadow-medium'
          }`}
        >
          Request Brochure
        </button>
        {(!formData.name || !formData.email) && (
          <p className="text-sm text-red-500 mt-2 text-center">
            * Please provide your name and email to receive the brochure
          </p>
        )}
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

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

          <div className="bg-white rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">Ref: {property.ref}</span>
              <div className="flex gap-4">
                <button
                  onClick={() => showSchedulingForm(propertyName)}
                  className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Schedule Viewing
                </button>
                <button
                  onClick={() => showBrochureForm(propertyName)}
                  className="border-2 border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors"
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

  const showSchedulingForm = (propertyName) => {
    const handleBookingSubmit = (formData) => {
      scheduleViewing(propertyName, formData);
    };

    const message = {
      type: 'bot',
      content: <BookingForm onSubmit={handleBookingSubmit} propertyName={propertyName} />
    };

    setChatHistory(prev => [...prev, message]);
  };

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

  const scheduleViewing = async (propertyName, formData) => {
    const property = sampleProperties[propertyName];
    
    try {
      console.log('Submitting viewing request:', {
        propertyName,
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
          date: formData.date,
          time: formData.time,
          status: 'pending_confirmation'
        },
        notes: formData.notes
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
          <div className="bg-white rounded-2xl p-4">
            <p className="text-green-600 font-medium">✓ Viewing request submitted successfully!</p>
            <div className="text-gray-600 mt-2 space-y-2">
              <p>Your viewing request has been submitted with the following details:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Property: {propertyName}</li>
                <li>Date: {formData.date}</li>
                <li>Time: {formData.time}</li>
                <li>Name: {formData.name}</li>
                <li>Email: {formData.email}</li>
                <li>Phone: {formData.phone}</li>
                <li>Notes: {formData.notes}</li>
              </ul>
              <p className="text-sm mt-2">Please check your email shortly. If you don't receive the brochure, please check your spam folder.</p>
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
          <div className="bg-white rounded-2xl p-4">
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
          <div className="bg-white rounded-2xl p-4">
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
          <div className="bg-white rounded-2xl p-4">
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
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              <span>{propertyName}</span>
            </button>
          ))}
        </div>
      </div>
    )
  };

  useEffect(() => {
    setChatHistory([welcome]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 h-[600px] flex flex-col">
      <div className="bg-white rounded-t-2xl shadow-soft p-6 border-b border-neutral-200">
        <h2 className="font-serif text-2xl text-primary">Costa Del Sol Property Assistant</h2>
        <p className="text-neutral-500 mt-1">Your personal guide to luxury properties</p>
      </div>

      <div 
        className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-50 to-white p-4 space-y-4"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-2xl shadow-soft ${
                message.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-neutral-200'
              } p-4`}
            >
              {typeof message.content === 'string' ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-b-2xl shadow-soft p-4 border-t border-neutral-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setInputMessage('')}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm"
          />
          <button
            onClick={() => setInputMessage('')}
            className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
