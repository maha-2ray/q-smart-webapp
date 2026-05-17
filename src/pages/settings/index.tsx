import { PageLayout } from "../../components/layouts/page-layout";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  GeneralProfile,
  QueueRules,
  BusinessHours,
  type GeneralProfileData,
  type QueueRulesData,
  type BusinessHoursData,
} from "./components";

const defaultBusinessHours = [
  {
    day: "Monday",
    isOpen: true,
    openingTime: "09:00",
    closingTime: "17:00",
  },
  {
    day: "Tuesday",
    isOpen: true,
    openingTime: "09:00",
    closingTime: "17:00",
  },
  {
    day: "Wednesday",
    isOpen: true,
    openingTime: "09:00",
    closingTime: "17:00",
  },
  {
    day: "Thursday",
    isOpen: true,
    openingTime: "09:00",
    closingTime: "17:00",
  },
  {
    day: "Friday",
    isOpen: true,
    openingTime: "09:00",
    closingTime: "17:00",
  },
  {
    day: "Saturday",
    isOpen: false,
    openingTime: "",
    closingTime: "",
  },
  {
    day: "Sunday",
    isOpen: false,
    openingTime: "",
    closingTime: "",
  },
];

const Settings: React.FC = () => {
  const [generalProfile, setGeneralProfile] = useState<GeneralProfileData>({
    businessName: "CityBank Downtown",
    timezone: "America/New_York",
    address: "123 Financial District, New York, NY 10004",
    logoUrl: "https://example.com/logo.png",
  });

  const [queueRules, setQueueRules] = useState<QueueRulesData>({
    noShowTimeout: 120,
    notificationPreference: "Both",
  });

  const [businessHours, setBusinessHours] = useState<BusinessHoursData>({
    hours: defaultBusinessHours,
    overrideMode: "Manual",
  });

  const handleSave = () => {
    console.log("Saving settings:", {
      generalProfile,
      queueRules,
      businessHours,
    });
    // TODO: Implement API call to save settings
  };

  const actions = (
    <Button
      title="Save Changes"
      variant="primary"
      size="md"
      onClick={handleSave}
    />
  );

  return (
    <PageLayout
      title="Settings"
      subtitle="Manage global business profile, queue rules, and operating hours."
      actions={actions}
    >
      <div className="space-y-6">
        <GeneralProfile data={generalProfile} onChange={setGeneralProfile} />
        <QueueRules data={queueRules} onChange={setQueueRules} />
        <BusinessHours data={businessHours} onChange={setBusinessHours} />
      </div>
    </PageLayout>
  );
};

export default Settings;
