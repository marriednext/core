"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DomainFormData {
  subdomain: string;
  domain: string;
}

interface DomainFormProps {
  defaultValues?: Partial<DomainFormData>;
  onSubmit: (data: DomainFormData) => void;
}

export default function DomainForm({
  defaultValues = {},
  onSubmit,
}: DomainFormProps) {
  const [formData, setFormData] = useState<DomainFormData>({
    subdomain: defaultValues.subdomain || "",
    domain: defaultValues.domain || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-300 pb-6">
        <h2 className="text-3xl font-semibold mb-2">Domain Settings</h2>
        <p className="text-lg text-gray-700">
          Configure your subdomain and custom domain settings
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="subdomain" className="text-base font-medium">
            Subdomain
          </Label>
          <Input
            id="subdomain"
            name="subdomain"
            type="text"
            value={formData.subdomain}
            onChange={handleChange}
            placeholder="e.g., yourwedding"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">
            Your unique subdomain identifier
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="domain" className="text-base font-medium">
            Domain
          </Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            value={formData.domain}
            onChange={handleChange}
            placeholder="e.g., marriednext.com"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">Your custom domain name</p>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
          >
            Save Domain Settings
          </button>
        </div>
      </div>
    </div>
  );
}
