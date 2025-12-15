import { OnboardingFlow, type OnboardingFlowProps } from "./onboarding-flow";
import { StoreProvider } from "./store-provider";
import type { Step3FormData } from "./step-3-venue-info";

export type OnboardingPageProps = {
  onHandleGoToDashboard: OnboardingFlowProps["onHandleGoToDashboard"];
  link: OnboardingFlowProps["link"];
  onSubmit?: OnboardingFlowProps["onSubmit"];
  validateSubdomain: OnboardingFlowProps["validateSubdomain"];
};

export { type Step3FormData };

export default function OnboardingPage({
  onHandleGoToDashboard,
  link,
  onSubmit,
  validateSubdomain,
}: OnboardingPageProps) {
  return (
    <StoreProvider>
      <OnboardingFlow
        onHandleGoToDashboard={onHandleGoToDashboard}
        link={link}
        onSubmit={onSubmit}
        validateSubdomain={validateSubdomain}
      />
    </StoreProvider>
  );
}
