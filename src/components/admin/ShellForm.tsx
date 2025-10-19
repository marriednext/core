"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ShellFormData {
  displayName: string;
  locationName: string;
  locationAddress: string;
  eventDate: Date | undefined;
  eventTime: string;
  mapsEmbedUrl: string;
  mapsShareUrl: string;
}

interface ShellFormProps {
  defaultValues?: Partial<ShellFormData>;
  onSubmitBasicInfo: (
    data: Pick<
      ShellFormData,
      "displayName" | "locationName" | "locationAddress"
    >
  ) => void;
  onSubmitDateTime: (
    data: Pick<ShellFormData, "eventDate" | "eventTime">
  ) => void;
  onSubmitMaps: (
    data: Pick<ShellFormData, "mapsEmbedUrl" | "mapsShareUrl">
  ) => void;
}

export default function ShellForm({
  defaultValues = {},
  onSubmitBasicInfo,
  onSubmitDateTime,
  onSubmitMaps,
}: ShellFormProps) {
  const [formData, setFormData] = useState<ShellFormData>({
    displayName: defaultValues.displayName || "",
    locationName: defaultValues.locationName || "",
    locationAddress: defaultValues.locationAddress || "",
    eventDate: defaultValues.eventDate,
    eventTime: defaultValues.eventTime || "",
    mapsEmbedUrl: defaultValues.mapsEmbedUrl || "",
    mapsShareUrl: defaultValues.mapsShareUrl || "",
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveBasicInfo = () => {
    onSubmitBasicInfo({
      displayName: formData.displayName,
      locationName: formData.locationName,
      locationAddress: formData.locationAddress,
    });
  };

  const handleSaveDateTime = () => {
    onSubmitDateTime({
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
    });
  };

  const handleSaveMaps = () => {
    onSubmitMaps({
      mapsEmbedUrl: formData.mapsEmbedUrl,
      mapsShareUrl: formData.mapsShareUrl,
    });
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-300 pb-6">
        <h2 className="text-3xl font-semibold mb-2">Website Shell</h2>
        <p className="text-lg text-gray-700">
          General settings for the website shell. These values will be seen on
          every page of the website.
        </p>
      </div>

      {/* Basic Info Section */}
      <div className="space-y-8">
        {/* Display Name */}
        <div className="space-y-3">
          <Label htmlFor="displayName" className="text-base font-medium">
            Display Name for Header
          </Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="e.g., Yulissa & Matthew"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">
            This name will appear in your venue header
          </p>
        </div>

        {/* Location Name */}
        <div className="space-y-3">
          <Label htmlFor="locationName" className="text-base font-medium">
            Location Name
          </Label>
          <Input
            id="locationName"
            name="locationName"
            type="text"
            value={formData.locationName}
            onChange={handleChange}
            placeholder="e.g., Bel Vino Winery"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">
            The name of your venue or business location
          </p>
        </div>

        {/* Location Address */}
        <div className="space-y-3">
          <Label htmlFor="locationAddress" className="text-base font-medium">
            Location Address
          </Label>
          <Input
            id="locationAddress"
            name="locationAddress"
            type="text"
            value={formData.locationAddress}
            onChange={handleChange}
            placeholder="e.g., 123 Main St, City, State 12345"
            className="text-lg py-6"
          />
          <p className="text-sm text-gray-700">
            The full address that will be displayed to guests
          </p>
        </div>

        {/* Save Button for Basic Info */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSaveBasicInfo}
            className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
          >
            Save Basic Info
          </button>
        </div>
      </div>

      {/* Event Date & Time Section */}
      <div className="space-y-6 pt-6 border-t border-gray-300">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Event Date & Time</h3>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="event-date-picker"
              className="text-base font-medium"
            >
              Date
            </Label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="event-date-picker"
                  className="w-40 justify-between font-normal text-base py-6"
                >
                  {formData.eventDate
                    ? formData.eventDate.toLocaleDateString()
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={formData.eventDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setFormData((prev) => ({ ...prev, eventDate: date }));
                    setDatePickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="event-time-picker"
              className="text-base font-medium"
            >
              Time
            </Label>
            <Input
              type="time"
              id="event-time-picker"
              name="eventTime"
              step="1"
              value={formData.eventTime}
              onChange={handleChange}
              className="text-base py-6 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>

        {/* Save Button for Date & Time */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSaveDateTime}
            className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
          >
            Save Date & Time
          </button>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="space-y-6 pt-6 border-t border-gray-300">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Google Maps</h3>
        </div>

        {/* Maps Embed URL */}
        <div className="space-y-3">
          <Label htmlFor="mapsEmbedUrl" className="text-base font-medium">
            Google Maps Embed URL
          </Label>
          <Input
            id="mapsEmbedUrl"
            name="mapsEmbedUrl"
            type="text"
            value={formData.mapsEmbedUrl}
            onChange={handleChange}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="text-sm py-6"
          />
          <p className="text-sm text-gray-700">
            Used for embedding the map on your page
          </p>
        </div>

        {/* Maps Share URL */}
        <div className="space-y-3">
          <Label htmlFor="mapsShareUrl" className="text-base font-medium">
            Google Maps Share URL
          </Label>
          <Input
            id="mapsShareUrl"
            name="mapsShareUrl"
            type="text"
            value={formData.mapsShareUrl}
            onChange={handleChange}
            placeholder="https://maps.app.goo.gl/..."
            className="text-base py-6"
          />
          <p className="text-sm text-gray-700">
            Shareable link to your location
          </p>
        </div>

        {/* Save Button for Google Maps */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSaveMaps}
            className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
          >
            Save Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}
