"use client";

import ShellForm from "@/components/admin/ShellForm";
import OurStoryForm from "@/components/admin/OurStoryForm";
import QAForm from "@/components/admin/QAForm";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="border-b border-gray-300 pb-6 mb-12">
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-lg text-gray-700">
          Manage your wedding website settings
        </p>
      </div>

      <div className="space-y-16">
        <ShellForm />
        <OurStoryForm />
        <QAForm />
      </div>
    </div>
  );
}
