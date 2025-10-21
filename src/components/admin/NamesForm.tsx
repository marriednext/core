"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NamesFormData {
  nameA: string;
  nameB: string;
}

interface NamesFormProps {
  defaultValues?: Partial<NamesFormData>;
  onSubmit: (data: NamesFormData) => void;
}

export default function NamesForm({
  defaultValues = {},
  onSubmit,
}: NamesFormProps) {
  const [formData, setFormData] = useState<NamesFormData>({
    nameA: defaultValues.nameA || "",
    nameB: defaultValues.nameB || "",
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
        <h2 className="text-3xl font-semibold mb-2">Names</h2>
        <p className="text-lg text-gray-700">
          Configure the primary names for your website
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="nameA" className="text-base font-medium">
            Name A
          </Label>
          <Input
            id="nameA"
            name="nameA"
            type="text"
            value={formData.nameA}
            onChange={handleChange}
            placeholder="e.g., Yulissa"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">First person's name</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="nameB" className="text-base font-medium">
            Name B
          </Label>
          <Input
            id="nameB"
            name="nameB"
            type="text"
            value={formData.nameB}
            onChange={handleChange}
            placeholder="e.g., Matthew"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">Second person's name</p>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
          >
            Save Names
          </button>
        </div>
      </div>
    </div>
  );
}
