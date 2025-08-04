import React, { useState } from 'react';
import { Mail, Bell, Phone } from 'lucide-react';

const Notifications = () => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      marketing: true,
      orderUpdates: true,
      newsletter: false,
      security: true
    },
    pushNotifications: {
      orderStatus: true,
      promotions: false,
      reminders: true,
      social: false
    },
    smsNotifications: {
      orderUpdates: true,
      promotions: false,
      security: true
    }
  });

  const updateSetting = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const NotificationToggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
        <p className="text-gray-600">Choose how you want to be notified about updates and promotions</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Mail className="mr-2" size={20} />
          Email Notifications
        </h3>
        <div className="space-y-1">
          <NotificationToggle
            label="Marketing Emails"
            description="Receive emails about new products and offers"
            checked={settings.emailNotifications.marketing}
            onChange={(value) => updateSetting('emailNotifications', 'marketing', value)}
          />
          <NotificationToggle
            label="Order Updates"
            description="Get notified about your order status"
            checked={settings.emailNotifications.orderUpdates}
            onChange={(value) => updateSetting('emailNotifications', 'orderUpdates', value)}
          />
          <NotificationToggle
            label="Newsletter"
            description="Weekly newsletter with tips and updates"
            checked={settings.emailNotifications.newsletter}
            onChange={(value) => updateSetting('emailNotifications', 'newsletter', value)}
          />
          <NotificationToggle
            label="Security Alerts"
            description="Important security and account notifications"
            checked={settings.emailNotifications.security}
            onChange={(value) => updateSetting('emailNotifications', 'security', value)}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2" size={20} />
          Push Notifications
        </h3>
        <div className="space-y-1">
          <NotificationToggle
            label="Order Status"
            description="Real-time updates on your orders"
            checked={settings.pushNotifications.orderStatus}
            onChange={(value) => updateSetting('pushNotifications', 'orderStatus', value)}
          />
          <NotificationToggle
            label="Promotions"
            description="Special deals and limited-time offers"
            checked={settings.pushNotifications.promotions}
            onChange={(value) => updateSetting('pushNotifications', 'promotions', value)}
          />
          <NotificationToggle
            label="Reminders"
            description="Cart reminders and follow-ups"
            checked={settings.pushNotifications.reminders}
            onChange={(value) => updateSetting('pushNotifications', 'reminders', value)}
          />
          <NotificationToggle
            label="Social"
            description="Comments, likes, and social interactions"
            checked={settings.pushNotifications.social}
            onChange={(value) => updateSetting('pushNotifications', 'social', value)}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Phone className="mr-2" size={20} />
          SMS Notifications
        </h3>
        <div className="space-y-1">
          <NotificationToggle
            label="Order Updates"
            description="Text messages about order status"
            checked={settings.smsNotifications.orderUpdates}
            onChange={(value) => updateSetting('smsNotifications', 'orderUpdates', value)}
          />
          <NotificationToggle
            label="Promotions"
            description="SMS alerts for special offers"
            checked={settings.smsNotifications.promotions}
            onChange={(value) => updateSetting('smsNotifications', 'promotions', value)}
          />
          <NotificationToggle
            label="Security"
            description="Important security notifications via SMS"
            checked={settings.smsNotifications.security}
            onChange={(value) => updateSetting('smsNotifications', 'security', value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Notifications;
