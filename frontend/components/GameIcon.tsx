"use client";

import {
  BaseballHelmet,
  Eye,
  GameController,
  RoadHorizon,
  TrafficSign,
  TrafficSignal,
} from "@phosphor-icons/react";
import type { GameIconName } from "@/lib/traffic-content";

type GameIconProps = {
  name: GameIconName;
  size?: number;
  className?: string;
};

export function GameIcon({ name, size = 28, className = "" }: GameIconProps) {
  const props = { size, weight: "duotone" as const, className };

  if (name === "traffic-light") return <TrafficSignal {...props} />;
  if (name === "look") return <Eye {...props} />;
  if (name === "helmet") return <BaseballHelmet {...props} />;
  if (name === "signs") return <TrafficSign {...props} />;
  if (name === "route") return <RoadHorizon {...props} />;

  return <GameController {...props} />;
}
