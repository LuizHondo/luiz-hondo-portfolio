import ShaderCard from "./shader-card";
import { Zap, Palette, Layers, Monitor } from "lucide-react";

// Basic usage with default pink wave effect
<ShaderCard />

// Feature showcase card with custom styling
<ShaderCard
  width={320}
  height={400}
  color="#5227FF"
  positionY={0.15}
  scale={4}
  branchIntensity={2}
  verticalExtent={1.5}
  horizontalExtent={1.5}
  blur={5}
  opacity={0.8}
  className="rounded-3xl"
>
  <div className="p-6 flex flex-col justify-between h-full">
    {/* Top section */}
    <div>
      <h3 className="text-2xl font-bold text-primary mb-1">
        Shader Card
      </h3>
      <p className="text-primary/50 text-sm">
        A stunning card component with an animated shader effect
      </p>
    </div>

    {/* Bottom section */}
    <div>
      {/* Feature grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-primary/70">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span>60fps constantly</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary/70">
          <Palette className="w-3.5 h-3.5 text-primary" />
          <span>Fully customizable</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary/70">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span>Lightweight & performant</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary/70">
          <Monitor className="w-3.5 h-3.5 text-primary" />
          <span>Responsive everywhere</span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-2.5 px-6 rounded-xl bg-primary text-accent text-sm font-medium hover:bg-primary/90 transition-colors">
        Explore
      </button>
    </div>
  </div>
</ShaderCard>

// Customized effect with blur and opacity
<ShaderCard
  color="#FF9FFC"
  blur={8}
  opacity={0.7}
  branchIntensity={1.2}
  verticalExtent={2.0}
/>

// Different styling options
<ShaderCard
  width={600}
  height={400}
  color="#00ffff"
  speed={1.5}
  positionY={0.8}
  scale={2.5}
  className="rounded-3xl shadow-2xl"
/>