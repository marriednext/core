import { Button } from "../ui/button";
import {
  Check,
  Sparkles,
  Clock,
  Crown,
  Zap,
  Shield,
  Headphones,
} from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Early Release
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-balance">
            Free while we grow
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We're just getting started. Enjoy full access to all features at no
            cost during our early release.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan Card */}
          <div className="relative rounded-2xl p-8 bg-card border border-border">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground">Free Plan</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-serif font-semibold text-foreground">
                  $0
                </span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Everything you need to plan your perfect wedding
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Beautiful wedding website
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Elegant templates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Guest list management
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  RSVP tracking
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Save the Date forms
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Unlimited guests
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Collaborative planning
                </span>
              </li>
            </ul>

            <Button className="w-full" variant="default">
              Get Started Free
            </Button>
          </div>

          {/* Premium Plan Card */}
          <div className="relative rounded-2xl p-8 bg-card border-2 border-primary">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground">Premium</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-serif font-semibold text-foreground">
                  $7
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                For couples who want a bit more
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Everything in Free
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground font-medium">
                  Connect your custom domain
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground font-medium">
                  Expanded photo storage
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Headphones className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground font-medium">
                  Priority support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Remove "Powered by" branding
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Early access to new features
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 -mx-2 rounded-lg bg-secondary/50">
                <Clock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">
                    Premium templates
                  </span>
                  <span className="block text-xs text-muted-foreground/70 mt-0.5">
                    Coming soon
                  </span>
                </div>
              </li>
            </ul>

            <Button className="w-full" variant="default">
              Upgrade to Premium
            </Button>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium text-foreground">Our promise:</span>{" "}
            The free plan will always include website, RSVPs, and guest
            management. No surprises.
          </p>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Public source means you can view all the code anytime at{" "}
          <a href="https://github.com" className="text-primary hover:underline">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
