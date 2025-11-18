import type { Meta } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

export const SeatingPlanner = () => {
  return (
    <section className="mn-shell mn-seatingplanner">
      <div className="mn-seatingplannershell">
        <div className="mn-seatingplanner-leftside">
          <h2 className="mn-seatingplanner-headinglabel">
            {"Plan Your Seating Arrangements"}
          </h2>
          <span className="mn-seatingplanner-textlabel">
            {
              "You’re already managing your guest list here. Plan seating arrangements for the big day all in the same dashboard."
            }
          </span>
          <a className="mn-primary-button mn-large-button">Get Started</a>
        </div>

        <div className="mn-seatingplanner-rightside">
          <img
            className="mn-seatingplanner-img"
            src="https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/marketing/table.png"
          />
        </div>
      </div>
    </section>
  );
};

const meta = {
  title: "MarriedNext.com Marketing/Seating Planner",
  component: SeatingPlanner,
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  args: {},
  tags: ["autodocs"],
} satisfies Meta<typeof SeatingPlanner>;

export default meta;
// type Story = StoryObj<typeof meta>;
