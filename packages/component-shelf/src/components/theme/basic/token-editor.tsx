"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { ChevronDown, RotateCcw, Eye, EyeOff, Upload, X, Sparkles, Plus, Trash2, GripVertical } from "lucide-react"
import { PreviewFrame } from "./preview-frame"

import heroImageAsset from "../../../assets/basic/romantic-couple-sunset-silhouette.png"
import coupleImageAsset from "../../../assets/basic/happy-engaged-couple-portrait.jpg"
import galleryImage1 from "../../../assets/basic/couple-laughing.png"
import galleryImage2 from "../../../assets/basic/engagement-ring-close-up.jpg"
import galleryImage3 from "../../../assets/basic/couple-holding-hands-walking.jpg"

type FaqItem = {
  question: string
  answer: string
}

type RegistryItem = {
  name: string
  description: string
  link: string
}

type TokenValues = {
  primary: string
  primaryForeground: string
  background: string
  headingColor: string
  bodyColor: string
  headingFont: string
  bodyFont: string
  heroImage: string | null
  coupleImage: string | null
  galleryImages: string[]
  faqs: FaqItem[]
  registries: RegistryItem[]
}

const defaultTokens: TokenValues = {
  primary: "#0a0a0a",
  primaryForeground: "#fafafa",
  background: "#fafafa",
  headingColor: "#0a0a0a",
  bodyColor: "#404040",
  headingFont: "Playfair Display",
  bodyFont: "Inter",
  heroImage: heroImageAsset as unknown as string,
  coupleImage: coupleImageAsset as unknown as string,
  galleryImages: [galleryImage1, galleryImage2, galleryImage3] as unknown as string[],
  faqs: [
    {
      question: "What is the dress code?",
      answer: "Black tie optional. We encourage formal attire — think elegant gowns and suits.",
    },
    {
      question: "Can I bring a plus one?",
      answer: "Due to venue capacity, we can only accommodate guests named on your invitation.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, complimentary valet parking will be available at the venue.",
    },
    {
      question: "Will the ceremony be indoors or outdoors?",
      answer: "The ceremony will be held outdoors in the Garden Pavilion (weather permitting).",
    },
    {
      question: "Are children welcome?",
      answer: "While we love your little ones, we have chosen to make our wedding an adults-only celebration.",
    },
  ],
  registries: [
    { name: "CRATE & BARREL", description: "Home essentials & modern living", link: "" },
    { name: "AMAZON", description: "Everything else we need", link: "" },
    { name: "HONEYMOON FUND", description: "Help us explore the world", link: "" },
  ],
}

const fontOptions = [
  { value: "Playfair Display", label: "Playfair Display", style: "Elegant Serif" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", style: "Classic Serif" },
  { value: "Crimson Text", label: "Crimson Text", style: "Traditional Serif" },
  { value: "Libre Baskerville", label: "Libre Baskerville", style: "Book Serif" },
  { value: "Lora", label: "Lora", style: "Modern Serif" },
  { value: "Inter", label: "Inter", style: "Clean Sans" },
  { value: "DM Sans", label: "DM Sans", style: "Geometric Sans" },
  { value: "Work Sans", label: "Work Sans", style: "Friendly Sans" },
  { value: "Outfit", label: "Outfit", style: "Modern Sans" },
  { value: "Space Grotesk", label: "Space Grotesk", style: "Technical Sans" },
]

const colorPresets = [
  {
    name: "Classic Black",
    primary: "#0a0a0a",
    primaryFg: "#fafafa",
    bg: "#fafafa",
    heading: "#0a0a0a",
    body: "#404040",
  },
  { name: "Midnight", primary: "#1e1b4b", primaryFg: "#fafafa", bg: "#f0f9ff", heading: "#1e1b4b", body: "#4c4770" },
  { name: "Forest", primary: "#14532d", primaryFg: "#fafafa", bg: "#f0fdf4", heading: "#14532d", body: "#3d6b4f" },
  { name: "Navy", primary: "#1e3a5f", primaryFg: "#fafafa", bg: "#f0f9ff", heading: "#1e3a5f", body: "#4a6a8a" },
  { name: "Burgundy", primary: "#7f1d1d", primaryFg: "#fafafa", bg: "#fef2f2", heading: "#7f1d1d", body: "#8b4a4a" },
  { name: "Sage", primary: "#4d7c5b", primaryFg: "#fafafa", bg: "#f8faf8", heading: "#3d5c4b", body: "#5a7a68" },
  { name: "Dusty Rose", primary: "#9d7a8c", primaryFg: "#fafafa", bg: "#fdf8fa", heading: "#6d4a5c", body: "#8a7080" },
  { name: "Terracotta", primary: "#c2703e", primaryFg: "#fafafa", bg: "#fdf8f5", heading: "#8b4513", body: "#a06a50" },
]

export function TokenEditor() {
  const [tokens, setTokens] = useState<TokenValues>(defaultTokens)
  const [showPreview, setShowPreview] = useState(true)
  const [expandedSection, setExpandedSection] = useState<"colors" | "fonts" | "images" | "faqs" | "registries" | null>(
    "colors",
  )
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const updateToken = useCallback(
    (key: keyof TokenValues, value: string | string[] | null | FaqItem[] | RegistryItem[]) => {
      setTokens((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const handleImageUpload = useCallback((key: "heroImage" | "coupleImage", file: File) => {
    const url = URL.createObjectURL(file)
    setTokens((prev) => ({ ...prev, [key]: url }))
  }, [])

  const addGalleryImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setTokens((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, url] }))
  }, [])

  const removeGalleryImage = useCallback((index: number) => {
    setTokens((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }))
  }, [])

  const applyPreset = useCallback((preset: (typeof colorPresets)[0]) => {
    setTokens((prev) => ({
      ...prev,
      primary: preset.primary,
      primaryForeground: preset.primaryFg,
      background: preset.bg,
      headingColor: preset.heading,
      bodyColor: preset.body,
    }))
  }, [])

  const resetTokens = useCallback(() => {
    setTokens(defaultTokens)
  }, [])

  const toggleSection = (section: "colors" | "fonts" | "images" | "faqs" | "registries") => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const addFaq = useCallback(() => {
    setTokens((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "New question?", answer: "Your answer here." }],
    }))
  }, [])

  const updateFaq = useCallback((index: number, field: "question" | "answer", value: string) => {
    setTokens((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }))
  }, [])

  const removeFaq = useCallback((index: number) => {
    setTokens((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }, [])

  const addRegistry = useCallback(() => {
    setTokens((prev) => ({
      ...prev,
      registries: [...prev.registries, { name: "NEW REGISTRY", description: "Description here", link: "" }],
    }))
  }, [])

  const updateRegistry = useCallback((index: number, field: "name" | "description" | "link", value: string) => {
    setTokens((prev) => ({
      ...prev,
      registries: prev.registries.map((reg, i) => (i === index ? { ...reg, [field]: value } : reg)),
    }))
  }, [])

  const removeRegistry = useCallback((index: number) => {
    setTokens((prev) => ({
      ...prev,
      registries: prev.registries.filter((_, i) => i !== index),
    }))
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a]">
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#e5e5e5] p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-serif mb-2">Go Premium</h2>
              <p className="text-[#666] text-sm mb-6">
                Remove the MarriedNext branding from your wedding website and make it truly yours.
              </p>
              <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 mb-6">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-serif">$7</span>
                  <span className="text-[#666] text-sm">/month</span>
                </div>
                <ul className="text-sm text-[#666] space-y-2">
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                    No MarriedNext branding
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                    Custom domain support
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                    Priority support
                  </li>
                </ul>
              </div>
              <button className="w-full bg-[#0a0a0a] text-white py-3 text-sm font-medium hover:bg-[#1a1a1a] transition-colors mb-3">
                Upgrade to Premium
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-sm text-[#999] hover:text-[#666] transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-[#e5e5e5] px-6 py-4 bg-white">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-[#666] hover:text-[#0a0a0a] transition-colors">
              ← Back to site
            </a>
            <div className="h-4 w-px bg-[#e5e5e5]" />
            <h1 className="text-sm font-medium">Design Your Website</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-sm text-[#666] hover:text-[#0a0a0a] transition-colors px-3 py-1.5 border border-[#e5e5e5] rounded-md hover:bg-[#f5f5f5]"
            >
              {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPreview ? "Hide" : "Show"} Preview
            </button>
            <button
              onClick={resetTokens}
              className="flex items-center gap-2 text-sm text-[#666] hover:text-[#0a0a0a] transition-colors px-3 py-1.5 border border-[#e5e5e5] rounded-md hover:bg-[#f5f5f5]"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[340px] min-h-[calc(100vh-65px)] border-r border-[#e5e5e5] bg-white overflow-y-auto">
          <div className="p-6 border-b border-[#e5e5e5]">
            <p className="text-sm text-[#666] leading-relaxed">
              Customize your wedding website by adjusting the colors, fonts, and images below. Changes appear instantly
              in the preview.
            </p>
          </div>

          <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] border border-[#e5e5e5]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#0a0a0a] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-0.5">Remove branding</p>
                <p className="text-xs text-[#666] mb-2">Make your site truly yours for just $7/mo</p>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="text-xs font-medium text-[#0a0a0a] underline underline-offset-2 hover:no-underline"
                >
                  Upgrade to Premium →
                </button>
              </div>
            </div>
          </div>

          <AccordionSection
            title="Colors"
            subtitle="Choose your wedding palette"
            isExpanded={expandedSection === "colors"}
            onToggle={() => toggleSection("colors")}
          >
            <div className="mb-6">
              <p className="text-xs text-[#999] mb-3">Quick presets</p>
              <div className="grid grid-cols-4 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group relative aspect-square border border-[#e5e5e5] rounded-md overflow-hidden hover:border-[#999] transition-colors"
                    title={preset.name}
                  >
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 h-full" style={{ backgroundColor: preset.bg }} />
                      <div className="w-1/2 h-full" style={{ backgroundColor: preset.primary }} />
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium opacity-0 group-hover:opacity-100 bg-black/50 text-white transition-opacity">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <ColorInput
                label="Primary Color"
                description="Buttons and accents"
                value={tokens.primary}
                onChange={(v) => updateToken("primary", v)}
              />
              <ColorInput
                label="Background"
                description="Page background"
                value={tokens.background}
                onChange={(v) => updateToken("background", v)}
              />
              <ColorInput
                label="Heading Color"
                description="Names and titles"
                value={tokens.headingColor}
                onChange={(v) => updateToken("headingColor", v)}
              />
              <ColorInput
                label="Body Color"
                description="Paragraphs and details"
                value={tokens.bodyColor}
                onChange={(v) => updateToken("bodyColor", v)}
              />
            </div>
          </AccordionSection>

          <AccordionSection
            title="Fonts"
            subtitle="Set the mood with typography"
            isExpanded={expandedSection === "fonts"}
            onToggle={() => toggleSection("fonts")}
          >
            <div className="space-y-5">
              <FontSelect
                label="Font 1"
                description="Names and section titles"
                value={tokens.headingFont}
                onChange={(v) => updateToken("headingFont", v)}
                options={fontOptions}
              />
              <FontSelect
                label="Font 2"
                description="Story, FAQs, and details"
                value={tokens.bodyFont}
                onChange={(v) => updateToken("bodyFont", v)}
                options={fontOptions}
              />
            </div>
          </AccordionSection>

          <AccordionSection
            title="Images"
            subtitle="Add your photos"
            isExpanded={expandedSection === "images"}
            onToggle={() => toggleSection("images")}
          >
            <div className="space-y-5">
              <ImageUpload
                label="Hero Image"
                description="Main banner background"
                value={tokens.heroImage}
                onChange={(file) => handleImageUpload("heroImage", file)}
                onClear={() => updateToken("heroImage", null)}
              />
              <ImageUpload
                label="Couple Photo"
                description="Your story section"
                value={tokens.coupleImage}
                onChange={(file) => handleImageUpload("coupleImage", file)}
                onClear={() => updateToken("coupleImage", null)}
              />
              <GalleryUpload
                label="Gallery"
                description="Add memories to share"
                images={tokens.galleryImages}
                onAdd={addGalleryImage}
                onRemove={removeGalleryImage}
              />
            </div>
          </AccordionSection>

          <AccordionSection
            title="FAQs"
            subtitle="Answer guest questions"
            isExpanded={expandedSection === "faqs"}
            onToggle={() => toggleSection("faqs")}
          >
            <div className="space-y-3">
              {tokens.faqs.map((faq, index) => (
                <div key={index} className="border border-[#e5e5e5] rounded-md p-3 group">
                  <div className="flex items-start gap-2">
                    <GripVertical size={14} className="text-[#ccc] mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, "question", e.target.value)}
                        placeholder="Question"
                        className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-[#ccc]"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, "answer", e.target.value)}
                        placeholder="Answer"
                        rows={2}
                        className="w-full bg-[#f5f5f5] border border-[#e5e5e5] rounded-md px-2 py-1.5 text-xs text-[#666] focus:outline-none focus:border-[#999] resize-none"
                      />
                    </div>
                    <button
                      onClick={() => removeFaq(index)}
                      className="p-1 text-[#ccc] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addFaq}
                className="w-full py-2.5 border border-dashed border-[#e5e5e5] rounded-md text-xs text-[#999] hover:border-[#999] hover:text-[#666] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                Add FAQ
              </button>
            </div>
          </AccordionSection>

          <AccordionSection
            title="Registry"
            subtitle="Where to send gifts"
            isExpanded={expandedSection === "registries"}
            onToggle={() => toggleSection("registries")}
          >
            <div className="space-y-3">
              {tokens.registries.map((registry, index) => (
                <div key={index} className="border border-[#e5e5e5] rounded-md p-3 group">
                  <div className="flex items-start gap-2">
                    <GripVertical size={14} className="text-[#ccc] mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <input
                        type="text"
                        value={registry.name}
                        onChange={(e) => updateRegistry(index, "name", e.target.value)}
                        placeholder="Registry name"
                        className="w-full bg-transparent text-xs font-medium uppercase tracking-wider focus:outline-none placeholder:text-[#ccc]"
                      />
                      <input
                        type="text"
                        value={registry.description}
                        onChange={(e) => updateRegistry(index, "description", e.target.value)}
                        placeholder="Description"
                        className="w-full bg-[#f5f5f5] border border-[#e5e5e5] rounded-md px-2 py-1.5 text-xs text-[#666] focus:outline-none focus:border-[#999]"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={registry.link}
                          onChange={(e) => updateRegistry(index, "link", e.target.value)}
                          placeholder="Link URL (optional)"
                          className="flex-1 bg-[#f5f5f5] border border-[#e5e5e5] rounded-md px-2 py-1.5 text-xs text-[#666] focus:outline-none focus:border-[#999]"
                        />
                        {registry.link && (
                          <span className="text-[10px] text-green-600 uppercase tracking-wider">Linked</span>
                        )}
                        {!registry.link && (
                          <span className="text-[10px] text-[#999] uppercase tracking-wider">No link</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeRegistry(index)}
                      className="p-1 text-[#ccc] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addRegistry}
                className="w-full py-2.5 border border-dashed border-[#e5e5e5] rounded-md text-xs text-[#999] hover:border-[#999] hover:text-[#666] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                Add Registry
              </button>
            </div>
          </AccordionSection>
        </aside>

        {showPreview && (
          <main className="flex-1 min-h-[calc(100vh-65px)] bg-[#f0f0f0] p-6">
            <div className="h-full rounded-lg border border-[#e5e5e5] overflow-hidden shadow-sm bg-white">
              <PreviewFrame tokens={tokens} />
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

function AccordionSection({
  title,
  subtitle,
  isExpanded,
  onToggle,
  children,
}: {
  title: string
  subtitle: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#fafafa] transition-colors"
      >
        <div className="text-left">
          <h2 className="text-sm font-medium">{title}</h2>
          <p className="text-xs text-[#999] mt-0.5">{subtitle}</p>
        </div>
        <ChevronDown size={16} className={`text-[#999] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>
      {isExpanded && <div className="px-6 pb-6">{children}</div>}
    </div>
  )
}

function ColorInput({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-10 h-10 border border-[#e5e5e5] rounded-md overflow-hidden flex-shrink-0">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        />
        <div className="absolute inset-0 rounded-md" style={{ backgroundColor: value }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#999]">{description}</p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 bg-[#f5f5f5] border border-[#e5e5e5] px-2 py-1.5 text-xs rounded-md focus:outline-none focus:border-[#999] uppercase text-center"
      />
    </div>
  )
}

function FontSelect({
  label,
  description,
  value,
  onChange,
  options,
}: {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; style: string }[]
}) {
  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#999]">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#f5f5f5] border border-[#e5e5e5] px-3 py-2.5 text-sm rounded-md focus:outline-none focus:border-[#999] cursor-pointer"
        style={{ fontFamily: value }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} — {opt.style}
          </option>
        ))}
      </select>
      <div className="mt-2 p-3 bg-[#f5f5f5] rounded-md">
        <p style={{ fontFamily: value }} className="text-xl">
          Emma & James
        </p>
      </div>
    </div>
  )
}

function ImageUpload({
  label,
  description,
  value,
  onChange,
  onClear,
}: {
  label: string
  description: string
  value: string | null
  onChange: (file: File) => void
  onClear: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onChange(file)
  }

  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#999]">{description}</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
      {value ? (
        <div className="relative group">
          <div className="aspect-video border border-[#e5e5e5] rounded-md overflow-hidden">
            <img src={value || "/placeholder.svg"} alt={label} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-[#0a0a0a] text-xs font-medium rounded-md hover:bg-[#f5f5f5]"
            >
              Replace
            </button>
            <button onClick={onClear} className="p-1.5 bg-white text-[#0a0a0a] rounded-md hover:bg-[#f5f5f5]">
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video border-2 border-dashed border-[#e5e5e5] rounded-md hover:border-[#999] hover:bg-[#fafafa] transition-colors flex flex-col items-center justify-center gap-2"
        >
          <Upload size={20} className="text-[#999]" />
          <span className="text-xs text-[#999]">Click to upload</span>
        </button>
      )}
    </div>
  )
}

function GalleryUpload({
  label,
  description,
  images,
  onAdd,
  onRemove,
}: {
  label: string
  description: string
  images: string[]
  onAdd: (file: File) => void
  onRemove: (index: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => onAdd(file))
    }
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#999]">{description}</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative group aspect-square border border-[#e5e5e5] rounded-md overflow-hidden">
            <img src={img || "/placeholder.svg"} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button
          onClick={() => inputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-[#e5e5e5] rounded-md hover:border-[#999] hover:bg-[#fafafa] transition-colors flex flex-col items-center justify-center gap-1"
        >
          <Upload size={16} className="text-[#999]" />
          <span className="text-[10px] text-[#999]">Add</span>
        </button>
      </div>
    </div>
  )
}
