"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

interface StoryItem {
  id: string;
  heading: string;
  text: string;
  photoUrl: string;
}

interface OurStoryFormProps {
  defaultStories?: StoryItem[];
  onSubmit: (stories: StoryItem[]) => void;
}

export default function OurStoryForm({
  defaultStories = [],
  onSubmit,
}: OurStoryFormProps) {
  const [stories, setStories] = useState<StoryItem[]>(defaultStories);

  const handleAddStory = () => {
    const newId = Math.max(...stories.map((s) => Number.parseInt(s.id)), 0) + 1;
    setStories([
      ...stories,
      {
        id: newId.toString(),
        heading: "",
        text: "",
        photoUrl: "",
      },
    ]);
  };

  const handleUpdateStory = (
    id: string,
    field: keyof StoryItem,
    value: string
  ) => {
    setStories(
      stories.map((story) =>
        story.id === id ? { ...story, [field]: value } : story
      )
    );
  };

  const handleDeleteStory = (id: string) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleSaveStories = () => {
    onSubmit(stories);
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-6">
        <h2 className="text-3xl font-semibold mb-2">Our Story</h2>
        <p className="text-lg text-gray-700">
          Add and manage your story sections with photos and descriptions
        </p>
      </div>

      {/* Story Items */}
      <div className="space-y-12">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="space-y-6 pb-8 border-b border-gray-300 last:border-b-0 last:pb-0"
          >
            {/* Story Index */}
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Story {index + 1}</h3>
              <button
                type="button"
                onClick={() => handleDeleteStory(story.id)}
                className="p-2 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <Label
                htmlFor={`heading-${story.id}`}
                className="text-base font-medium"
              >
                Heading
              </Label>
              <Input
                id={`heading-${story.id}`}
                type="text"
                value={story.heading}
                onChange={(e) =>
                  handleUpdateStory(story.id, "heading", e.target.value)
                }
                placeholder="e.g., How we met"
                className="text-lg py-6"
              />
            </div>

            {/* Text */}
            <div className="space-y-3">
              <Label
                htmlFor={`text-${story.id}`}
                className="text-base font-medium"
              >
                Story Text
              </Label>
              <Textarea
                id={`text-${story.id}`}
                value={story.text}
                onChange={(e) =>
                  handleUpdateStory(story.id, "text", e.target.value)
                }
                placeholder="Tell your story..."
                className="text-base min-h-32 resize-none leading-relaxed"
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-3">
              <Label
                htmlFor={`photo-${story.id}`}
                className="text-base font-medium"
              >
                Photo URL
              </Label>
              <Input
                id={`photo-${story.id}`}
                type="text"
                value={story.photoUrl}
                onChange={(e) =>
                  handleUpdateStory(story.id, "photoUrl", e.target.value)
                }
                placeholder="https://example.com/photo.jpg"
                className="text-sm py-6"
              />
              <p className="text-sm text-gray-700">
                Direct URL to your story photo
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={handleSaveStories}
          className="inline-block border-2 border-black px-8 py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors text-base"
        >
          Save Stories
        </button>
        <button
          type="button"
          onClick={handleAddStory}
          className="border-2 border-gray-400 px-8 py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors text-base flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Story
        </button>
      </div>
    </div>
  );
}
