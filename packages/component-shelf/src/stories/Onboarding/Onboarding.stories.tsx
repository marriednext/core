import type { Meta, StoryObj } from "@storybook/react-vite";
import OnboardingPage from "../../components/application/onboarding";
import type { Step3FormData } from "../../components/application/onboarding";

const meta = {
  title: "Application/Onboarding",
  component: OnboardingPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OnboardingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const MockLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export const Default: Story = {
  args: {
    onHandleGoToDashboard: () => {
      console.log("Navigate to dashboard");
    },
    link: MockLink,
    onSubmit: async (data: Step3FormData) => {
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    validateSubdomain: async (subdomain: string) => {
      console.log("Validating subdomain:", subdomain);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (subdomain === "taken") {
        return { valid: false, error: "This subdomain is already taken" };
      }
      return { valid: true };
    },
  },
};

export const WithTakenSubdomain: Story = {
  args: {
    onHandleGoToDashboard: () => {
      console.log("Navigate to dashboard");
    },
    link: MockLink,
    onSubmit: async (data: Step3FormData) => {
      console.log("Form submitted:", data);
    },
    validateSubdomain: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { valid: false, error: "This subdomain is already taken" };
    },
  },
};

