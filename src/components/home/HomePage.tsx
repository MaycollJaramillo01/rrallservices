import { HeroEditorial } from "./HeroEditorial";
import { BrandStatement } from "./BrandStatement";
import { FrescaFlowStory } from "./FrescaFlowStory";
import { ProductDiscoveryRail } from "./ProductDiscoveryRail";
import { CategoryArchitecture } from "./CategoryArchitecture";
import { FrescaPureFeature } from "./FrescaPureFeature";
import { LifestyleMoment } from "./LifestyleMoment";
import { DemonstrationExperience } from "./DemonstrationExperience";
import { KitchenSystemsPreview } from "./KitchenSystemsPreview";
import { RRAllServicesStory } from "./RRAllServicesStory";
import { TrajectoryData } from "./TrajectoryData";
import { DemoConversionSection } from "./DemoConversionSection";
import { OpportunityInvitation } from "./OpportunityInvitation";
import { InstagramCarousel } from "./InstagramCarousel";

export function HomePage() {
  return (
    <main>
      <HeroEditorial />
      <BrandStatement />
      <InstagramCarousel />
      <FrescaFlowStory />
      <ProductDiscoveryRail />
      <CategoryArchitecture />
      <FrescaPureFeature />
      <LifestyleMoment />
      <DemonstrationExperience />
      <KitchenSystemsPreview />
      <RRAllServicesStory />
      <TrajectoryData />
      <OpportunityInvitation />
      <DemoConversionSection />
    </main>
  );
}
