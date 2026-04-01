import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function DemoFeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <Card key={feature.title} hover>
          <feature.icon className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
          <h3 className="font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-500 text-sm">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
}
