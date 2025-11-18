import type { Meta } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

export const UploadMemories = () => {
  return (
    <section className="mn-shell mn-memories">
      <div className="mn-memoriesshell">
        <div className="mn-memories-leftside">
          <img
            className="mn-memories-img"
            src="https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/marketing/weddingcouple.png"
          />
        </div>
        <div className="mn-memories-rightside">
          <h2 className="mn-memories-headinglabel">
            {"Upload and Share Your Memories"}
          </h2>
          <span className="mn-memories-textlabel">
            {
              "After the fun is over, your guests can upload photos they took of your special day. No additional sign up required."
            }
          </span>
          <a className="mn-primary-button mn-large-button">Get Started</a>
        </div>
      </div>
    </section>
  );
};

const meta = {
  title: "MarriedNext.com Marketing/Upload Memories",
  component: UploadMemories,
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  args: {},
  tags: ["autodocs"],
} satisfies Meta<typeof UploadMemories>;

export default meta;
// type Story = StoryObj<typeof meta>;
