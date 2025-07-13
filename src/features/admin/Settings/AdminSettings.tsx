// File: src/features/admin/AdminSettings.tsx
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [firstName, setFirstName] = useState("Boaz");
  const [lastName, setLastName] = useState("Limo");
  const [email, setEmail] = useState("admin@medsystem.com");
  const [phone, setPhone] = useState("+254700000000");
  const [address, setAddress] = useState("Nairobi, Kenya");

  const tabTitles = ["Profile", "Notifications", "System"];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 lg:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Admin Settings</h1>

      <Tab.Group>
        <Tab.List className="grid grid-cols-3 gap-2 bg-gray-100 rounded-xl p-1 mb-6">
          {tabTitles.map((title) => (
            <Tab key={title} className={({ selected }) =>
              clsx(
                "px-4 py-2 text-sm font-medium rounded-lg transition",
                selected ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-blue-500"
              )
            }>
              {title}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* === Profile === */}
          <Tab.Panel>
            <div className="bg-white p-6 rounded-2xl shadow space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter physical address"
                  />
                </div>
              </div>

              <div className="text-right">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow">
                  Save Profile
                </Button>
              </div>
            </div>
          </Tab.Panel>

          {/* === Notifications === */}
          <Tab.Panel>
            <div className="bg-white p-6 rounded-2xl shadow space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  enabled={emailNotifications}
                  setEnabled={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch
                  enabled={smsNotifications}
                  setEnabled={setSmsNotifications}
                />
              </div>


              <div className="text-right">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
                  Save Preferences
                </Button>
              </div>
            </div>
          </Tab.Panel>

          {/* === System === */}
          <Tab.Panel>
            <div className="bg-white p-6 rounded-2xl shadow space-y-6">
              <div>
                <Label htmlFor="autoCancel">Auto-cancel unconfirmed appointments (hours)</Label>
                <Input id="autoCancel" placeholder="e.g. 24" />
              </div>

              <div>
                <Label htmlFor="defaultPay">Default Payment Per Hour for Doctors</Label>
                <Input id="defaultPay" placeholder="e.g. 2000" />
              </div>

              <div className="text-right">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow">
                  Save System Settings
                </Button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
