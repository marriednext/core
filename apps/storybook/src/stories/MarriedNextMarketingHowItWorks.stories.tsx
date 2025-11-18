import type { Meta } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import WheelSvg from "./WheelSvg";

interface HowItWorksStepsTypes {
  heading: string;
  text: string;
}
interface HowItWorksTypes {
  howItWorksLabel: string;
  steps: HowItWorksStepsTypes[];
}

const howItWorksDefaults: HowItWorksTypes = {
  howItWorksLabel: "How It Works",
  steps: [
    {
      heading: "Choose Your Design",
      text: "We have a growing collection of website designs for you to choose from.",
    },
    {
      heading: "Build Your Website",
      text: "All you need is some photos of the engaged couple and a story to share.",
    },
    {
      heading: "Create Your Guest List",
      text: "Create invitations for families, assign plus ones, customize invitations and more.",
    },
    {
      heading: "Collect RSVP's",
      text: "Names on your Guest List may RSVP for your special day by visiting your website.",
    },
  ],
};

export const HowItWorks = ({
  howItWorksLabel = howItWorksDefaults.howItWorksLabel,
  steps = howItWorksDefaults.steps,
}: HowItWorksTypes) => {
  const useable = steps && steps.length;
  return (
    <section className="mn-shell mn-hiw">
      <div className="mn-hiw-shell">
        <div className="mn-hiw-leftside">
          <h2 className="mn-hiw-titlelabel">{howItWorksLabel}</h2>
        </div>
        <div className="mn-hiw-rightside">
          <div className="mn-hiw-rightsideshell">
            {useable &&
              steps.map((step, index) => (
                <div key={index} className="mn-hiw-card">
                  <WheelSvg className={"mn-hiw-wheel mn-hiw-wheel__" + index} />
                  <h3 className="mn-hiw-cardheading">{step.heading}</h3>
                  <span className="mn-hiw-cardtext">{step.text}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const meta = {
  title: "MarriedNext.com Marketing/How It Works",
  component: HowItWorks,
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  args: {
    // ...navDefaults,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HowItWorks>;

export default meta;
// type Story = StoryObj<typeof meta>;
