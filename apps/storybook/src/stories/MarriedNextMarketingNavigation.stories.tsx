import type { Meta } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

interface NavLinkTypes {
  link: string;
  label: string;
}

interface NavPropTypes {
  isAuthenticated?: boolean;
  titleLabel?: string;
  navLinks?: NavLinkTypes[];
}

const navDefaults: NavPropTypes = {
  isAuthenticated: false,
  titleLabel: "Married Next",
  navLinks: [
    {
      label: "About Us",
      link: "/about-us",
    },
    {
      label: "Services",
      link: "/services",
    },

    {
      label: "Templates",
      link: "/templates",
    },
  ],
};

export const Navigation = ({
  isAuthenticated,
  titleLabel,
  navLinks,
}: NavPropTypes) => {
  const useable = navLinks && navLinks.length > 0;
  return (
    <header className="mn-shell mn-header">
      <div className="mn-header-shell">
        <h1 className="mn-page-title">{titleLabel}</h1>

        <nav className="mn-navigation">
          <ul className="mn-navigation-list">
            {useable &&
              navLinks.map((item) => (
                <li className="mn-navigation-list-item">
                  <a className="mn-navigation-link" href={item.link}>
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>

          {isAuthenticated ? (
            <a
              href="/engaged"
              className="mn-navigation-action-button mn-secondary-button"
            >
              My Wedding
            </a>
          ) : (
            <a
              href="/register"
              className="mn-navigation-action-button mn-secondary-button"
            >
              Join for free
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

const meta = {
  title: "MarriedNext.com Marketing/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  args: {
    ...navDefaults,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
// type Story = StoryObj<typeof meta>;
