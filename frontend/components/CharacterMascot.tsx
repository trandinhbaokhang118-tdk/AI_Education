"use client";

import { useEffect, useRef, useState } from "react";
import type { CharacterAction } from "@/lib/traffic-content";
import { useCharacterStore } from "@/lib/character-store";

type Props = {
  action: CharacterAction;
  size?: number;
  accentColor?: string;
  showName?: boolean;
};

/* ─────────────────────────────────────────────────────────────────────────────
   COLOUR PALETTE  (matching the artwork photos)
───────────────────────────────────────────────────────────────────────────── */
const C = {
  skin:      "#FFCC99",
  skinDark:  "#F0A86B",
  hair:      "#3D2107",
  hairLight: "#5C3317",
  jacket:    "#1A3264",      // navy blue tracksuit
  jacketMid: "#223A7A",
  jacketLight:"#2E4E9E",
  stripe:    "#F59E0B",      // orange-yellow stripe
  stripe2:   "#FCD34D",
  white:     "#FFFFFF",
  collar:    "#F8F8F8",
  pants:     "#162B52",
  shoe:      "#3D2B1F",
  shoeSole:  "#F5F5F5",
  pack:      "#7B2323",      // dark red backpack
  packLight: "#9E3333",
  badge:     "#22C55E",
  eye:       "#1A1A2E",
  cheek:     "#FF9999",
  lip:       "#D97069",
  helmet:    "#3B82F6",
  helmetFront: "#60A5FA",
};

/* ─────────────────────────────────────────────────────────────────────────────
   EXPRESSION helper
───────────────────────────────────────────────────────────────────────────── */
type Expr = "normal" | "happy" | "sad" | "surprised" | "thinking" | "angry";

function getExpr(action: CharacterAction): Expr {
  switch (action) {
    case "celebrate": return "happy";
    case "wrong":     return "sad";
    case "thinking":  return "thinking";
    case "stop":      return "surprised";
    default:          return "normal";
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   FACE  (rendered in head-local space, head centred at 0,0)
───────────────────────────────────────────────────────────────────────────── */
function Face({ expr }: { expr: Expr }) {
  return (
    <g>
      {/* ── white of eyes ── */}
      <ellipse cx="-10" cy="-3" rx="7"  ry="8.5" fill="white" />
      <ellipse cx=" 10" cy="-3" rx="7"  ry="8.5" fill="white" />

      {/* ── pupils ── */}
      {expr === "happy" ? (
        /* happy = arc eyes */
        <>
          <path d="M-16,-8 Q-10,-2 -4,-8"  stroke={C.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M  4,-8 Q  10,-2  16,-8" stroke={C.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : expr === "sad" ? (
        <>
          <circle cx="-10" cy="-3" r="4.5" fill={C.eye} />
          <circle cx=" 10" cy="-3" r="4.5" fill={C.eye} />
          <circle cx=" -8" cy="-5" r="1.5" fill="white" />
          <circle cx="  12" cy="-5" r="1.5" fill="white" />
          {/* tear */}
          <path d="M-10,2 Q-9,7 -10,12" stroke="#93C5FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      ) : expr === "surprised" ? (
        <>
          <circle cx="-10" cy="-3" r="6"   fill={C.eye} />
          <circle cx=" 10" cy="-3" r="6"   fill={C.eye} />
          <circle cx=" -8" cy="-5" r="2"   fill="white" />
          <circle cx="  12" cy="-5" r="2"  fill="white" />
        </>
      ) : expr === "thinking" ? (
        <>
          <circle cx="-10" cy="-4" r="4.5" fill={C.eye} />
          <circle cx=" 10" cy="-6" r="4.5" fill={C.eye} />
          <circle cx=" -8" cy="-6" r="1.5" fill="white" />
          <circle cx="  12" cy="-8" r="1.5" fill="white" />
        </>
      ) : (
        /* normal */
        <>
          <circle cx="-10" cy="-3" r="4.5" fill={C.eye} />
          <circle cx=" 10" cy="-3" r="4.5" fill={C.eye} />
          <circle cx=" -8" cy="-5" r="1.5" fill="white" />
          <circle cx="  12" cy="-5" r="1.5" fill="white" />
        </>
      )}

      {/* ── eyebrows ── */}
      {expr === "sad" || expr === "angry" ? (
        <>
          <path d="M-16,-14 Q-10,-11 -4,-14" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M  4,-14 Q  10,-11  16,-14" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      ) : expr === "surprised" ? (
        <>
          <path d="M-16,-17 Q-10,-21 -4,-17" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M  4,-17 Q  10,-21  16,-17" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M-16,-15 Q-10,-18 -4,-15" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M  4,-15 Q  10,-18  16,-15" stroke={C.hair} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* ── nose ── */}
      <ellipse cx="0" cy="5" rx="2.5" ry="1.8" fill={C.skinDark} opacity="0.55" />

      {/* ── mouth ── */}
      {expr === "happy" ? (
        <path d="M-11,13 Q0,21 11,13" stroke={C.lip} strokeWidth="2.5" fill="#FFAAAA" strokeLinecap="round" />
      ) : expr === "sad" ? (
        <path d="M-10,17 Q0,12 10,17"  stroke={C.lip} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : expr === "surprised" ? (
        <ellipse cx="0" cy="15" rx="6" ry="7" fill="#CC6655" />
      ) : (
        <path d="M-9,14 Q0,19 9,14" stroke={C.lip} strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* ── rosy cheeks ── */}
      <ellipse cx="-22" cy="8"  rx="7" ry="5" fill={C.cheek} opacity="0.45" />
      <ellipse cx=" 22" cy="8"  rx="7" ry="5" fill={C.cheek} opacity="0.45" />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELMET  (rendered in head-local space)
───────────────────────────────────────────────────────────────────────────── */
function Helmet({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <g>
      <ellipse cx="0" cy="-22" rx="32" ry="21" fill={C.helmet} />
      <ellipse cx="0" cy="-22" rx="24" ry="14" fill={C.helmetFront} opacity="0.45" />
      <rect x="-31" y="-6"  width="62" height="7"  rx="3.5" fill="#1D4ED8" />
      {/* vent lines */}
      <rect x="-10" y="-32" width="4" height="14" rx="2" fill="#60A5FA" opacity="0.6" />
      <rect x="-2"  y="-34" width="4" height="16" rx="2" fill="#60A5FA" opacity="0.6" />
      <rect x="  6" y="-32" width="4" height="14" rx="2" fill="#60A5FA" opacity="0.6" />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export function CharacterMascot({ action, size = 160, accentColor = "#22c55e", showName = true }: Props) {
  const characterName = useCharacterStore((s) => s.characterName);

  /* ── frame counter for cyclic animations ── */
  const [tick, setTick] = useState(0);
  const tickRef = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1;
      setTick(tickRef.current);
    }, 60); // ~16 fps
    return () => clearInterval(id);
  }, []);

  /* ── derived time values ── */
  const t    = tick * 0.016;          // seconds-like value
  const sin  = Math.sin;
  const cos  = Math.cos;
  const pi   = Math.PI;

  /* ──────────────────────────────────────────────────────
     ANIMATION: compute transform for each body part
  ────────────────────────────────────────────────────── */

  let bodyY      = 0;   // whole body vertical offset
  let bodyRot    = 0;   // whole body tilt
  let headRot    = 0;   // head tilt
  let headX      = 0;   // head horizontal offset
  let leftArmRot = 15;  // degrees from neutral
  let rightArmRot= -15;
  let leftLegRot = 0;
  let rightLegRot= 0;
  let showHelmet = false;

  switch (action) {

    /* ─── IDLE / default ─────────────────────────────── */
    case "idle":
    default:
      bodyY       = sin(t * 0.9) * 2;           // gentle sway up/down
      headRot     = sin(t * 0.7) * 3;           // slow head bob
      leftArmRot  = 15 + sin(t * 0.9) * 4;
      rightArmRot = -15 + sin(t * 0.9 + pi) * 4;
      break;

    /* ─── WALKING / cross-road ───────────────────────── */
    case "walking":
    case "cross-road": {
      const w = t * 3.5;
      bodyY       = Math.abs(sin(w)) * -5;       // subtle bounce
      bodyRot     = sin(w) * 2;
      headRot     = sin(w) * -2;
      leftLegRot  = sin(w)       * 35;           // stride front/back
      rightLegRot = sin(w + pi)  * 35;
      leftArmRot  = 15 + sin(w + pi) * 30;      // arms swing opposite to legs
      rightArmRot = -15 + sin(w)     * 30;
      break;
    }

    /* ─── WAVE ───────────────────────────────────────── */
    case "wave": {
      bodyY       = sin(t * 1.0) * 2;
      headRot     = sin(t * 1.0) * 4;
      leftArmRot  = 15;
      rightArmRot = -80 + sin(t * 4.5) * 28;   // fast wave up-down
      break;
    }

    /* ─── CELEBRATE ──────────────────────────────────── */
    case "celebrate": {
      const j = t * 5;
      bodyY       = sin(j) * -10;                // jumping
      headRot     = sin(j * 0.5) * 8;
      leftArmRot  = -80 + sin(j * 0.9) * 15;   // both arms raised
      rightArmRot = 80  + sin(j * 0.9 + pi) * 15;
      leftLegRot  = sin(j) * 20;
      rightLegRot = sin(j + pi) * 20;
      break;
    }

    /* ─── STOP ───────────────────────────────────────── */
    case "stop": {
      bodyY      = sin(t * 0.8) * 1.5;
      headRot    = 0;
      leftArmRot = 15;
      // right arm extends forward (STOP hand)
      rightArmRot = 75 + sin(t * 1.2) * 5;
      break;
    }

    /* ─── THINKING ───────────────────────────────────── */
    case "thinking": {
      bodyY      = sin(t * 0.6) * 2;
      headRot    = sin(t * 0.5) * -8 - 6;       // head tilted, oscillating
      headX      = sin(t * 0.5) * -4;
      // right hand to chin
      rightArmRot = 40 + sin(t * 0.5) * 8;
      leftArmRot  = 20 + sin(t * 0.6) * 4;
      break;
    }

    /* ─── WRONG / sad shake ──────────────────────────── */
    case "wrong": {
      headRot    = sin(t * 8) * 18;              // fast left-right shake
      bodyRot    = sin(t * 8) * 4;
      bodyY      = sin(t * 4) * 2;
      leftArmRot = 15;
      rightArmRot= -15;
      break;
    }

    /* ─── LOOK LEFT / RIGHT / BOTH ───────────────────── */
    case "look-left":
      headRot = -30; headX = -8; bodyY = sin(t * 0.9) * 2; break;
    case "look-right":
      headRot =  30; headX =  8; bodyY = sin(t * 0.9) * 2; break;
    case "look-both":
      headRot = sin(t * 1.5) * 30;
      headX   = sin(t * 1.5) * 10;
      bodyY   = sin(t * 0.9) * 2;
      break;

    /* ─── PUT HELMET ─────────────────────────────────── */
    case "put-helmet": {
      showHelmet   = true;
      bodyY        = sin(t * 0.9) * 2;
      headRot      = sin(t * 0.7) * 3;
      // both hands reaching up to helmet
      leftArmRot   = -60 + sin(t * 1.2) * 10;
      rightArmRot  = 60  + sin(t * 1.2 + pi) * 10;
      break;
    }

    /* ─── POINT ──────────────────────────────────────── */
    case "point": {
      bodyY       = sin(t * 0.9) * 2;
      headRot     = -5;
      // left arm points forward
      leftArmRot  = -65 + sin(t * 1) * 5;
      rightArmRot = -15;
      break;
    }

    /* ─── READ SIGN ──────────────────────────────────── */
    case "read-sign": {
      bodyY       = sin(t * 0.8) * 1.5;
      headRot     = -8;
      leftArmRot  = -40;
      rightArmRot = -10;
      break;
    }
  }

  const expr = getExpr(action);

  return (
    <div
      className="relative inline-flex flex-col items-center select-none"
      aria-label={characterName ? `${characterName}` : "Nhân vật học giao thông"}
      style={{ width: size }}
    >
      <svg
        viewBox="0 0 220 260"
        width={size}
        height={size * (260 / 220)}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* ── SHADOW ── */}
        <ellipse cx="110" cy="254" rx="32" ry="6" fill="rgba(0,0,0,0.13)" />

        {/* ════════════════════════════════
            WHOLE BODY GROUP  (translates Y + rotates)
        ════════════════════════════════ */}
        <g transform={`translate(110, ${120 + bodyY}) rotate(${bodyRot})`}>

          {/* ── BACKPACK (behind body) ── */}
          <g transform="translate(22, -20)">
            <rect x="-4" y="-28" width="22" height="36" rx="6"  fill={C.pack} />
            <rect x="-2" y="-26" width="18" height="14" rx="4"  fill={C.packLight} />
            <rect x="2"  y="-12" width="10" height="8"  rx="3"  fill={C.pack} />
            {/* strap */}
            <path d="M-4,-28 Q-14,-24 -14,-8" stroke={C.pack} strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          {/* ── LEFT ARM (character's left = viewer's right side) ── */}
          <g
            transform={`translate(-28, -22) rotate(${leftArmRot})`}
            style={{ transformOrigin: "-28px -22px" }}
          >
            {/* upper arm */}
            <rect x="-6" y="0" width="12" height="26" rx="6" fill={C.jacketLight} />
            {/* stripe on arm */}
            <rect x="-6" y="6" width="12" height="4"  rx="1" fill={C.stripe} />
            {/* forearm */}
            <rect x="-5" y="22" width="10" height="20" rx="5" fill={C.skin} />
            {/* hand */}
            <ellipse cx="0" cy="44" rx="7" ry="6" fill={C.skin} />
            {/* thumb */}
            <ellipse cx="-6" cy="40" rx="3.5" ry="4" fill={C.skin} />
            {/* fingers */}
            {action === "stop" ? (
              /* open palm for STOP */
              <>
                <rect x="-8" y="36" width="16" height="22" rx="5" fill={C.skin} />
                <line x1="-4" y1="36" x2="-4" y2="58" stroke={C.skinDark} strokeWidth="1" opacity="0.4"/>
                <line x1="0"  y1="36" x2="0"  y2="60" stroke={C.skinDark} strokeWidth="1" opacity="0.4"/>
                <line x1="4"  y1="36" x2="4"  y2="58" stroke={C.skinDark} strokeWidth="1" opacity="0.4"/>
              </>
            ) : null}
          </g>

          {/* ── RIGHT ARM ── */}
          <g
            transform={`translate(28, -22) rotate(${rightArmRot})`}
            style={{ transformOrigin: "28px -22px" }}
          >
            <rect x="-6" y="0" width="12" height="26" rx="6" fill={C.jacketLight} />
            <rect x="-6" y="6" width="12" height="4"  rx="1" fill={C.stripe} />
            <rect x="-5" y="22" width="10" height="20" rx="5" fill={C.skin} />
            <ellipse cx="0" cy="44" rx="7" ry="6" fill={C.skin} />
            <ellipse cx="6"  cy="40" rx="3.5" ry="4" fill={C.skin} />
            {/* wave hand fingers spread */}
            {action === "wave" && (
              <>
                <ellipse cx="0"  cy="44" rx="8"   ry="7"   fill={C.skin} />
                <ellipse cx="-6" cy="38" rx="3"   ry="4.5" fill={C.skin} />
                <ellipse cx="7"  cy="38" rx="3"   ry="4.5" fill={C.skin} />
                <ellipse cx="-2" cy="36" rx="2.5" ry="5"   fill={C.skin} />
                <ellipse cx="4"  cy="36" rx="2.5" ry="5"   fill={C.skin} />
              </>
            )}
          </g>

          {/* ── TORSO / JACKET ── */}
          <g>
            {/* Main jacket body */}
            <rect x="-30" y="-40" width="60" height="68" rx="14" fill={C.jacket} />
            {/* Jacket left panel */}
            <rect x="-30" y="-40" width="28" height="68" rx="12" fill={C.jacketMid} />
            {/* White collar / shirt */}
            <path d="M-14,-40 L0,-22 L14,-40" fill={C.collar} />
            <ellipse cx="0" cy="-28" rx="10" ry="14" fill={C.collar} />
            {/* Stripe accents on jacket */}
            <rect x="-30" y="-20" width="8"  height="40" rx="4" fill={C.stripe}  />
            <rect x=" 22" y="-20" width="8"  height="40" rx="4" fill={C.stripe2} />
            {/* Badge on chest */}
            <circle cx="-10" cy="-10" r="8" fill={C.badge} />
            <circle cx="-10" cy="-10" r="5" fill="white" opacity="0.3" />
            <text x="-10" y="-7" fontSize="7" textAnchor="middle" fill="white" fontWeight="bold">🚲</text>
            {/* Jacket zipper */}
            <line x1="0" y1="-24" x2="0" y2="28" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          </g>

          {/* ── PANTS ── */}
          <rect x="-28" y="26" width="56" height="30" rx="10" fill={C.pants} />
          {/* belt area */}
          <rect x="-28" y="26" width="56" height="8"  rx="6" fill={C.jacket} />

          {/* ── LEFT LEG ── */}
          <g
            transform={`translate(-14, 56) rotate(${leftLegRot})`}
            style={{ transformOrigin: "-14px 56px" }}
          >
            {/* thigh */}
            <rect x="-11" y="0" width="20" height="28" rx="8" fill={C.pants} />
            {/* shin */}
            <rect x="-10" y="24" width="18" height="22" rx="7" fill={C.jacket} />
            {/* stripe */}
            <rect x="-10" y="30" width="18" height="5" rx="2" fill={C.stripe} opacity="0.6" />
            {/* shoe */}
            <ellipse cx="0"   cy="48" rx="13" ry="8"  fill={C.shoe} />
            <ellipse cx="-2"  cy="46" rx="10" ry="6"  fill="#5C4033" />
            {/* shoe sole white tip */}
            <ellipse cx=" 8"  cy="50" rx="5"  ry="3"  fill={C.shoeSole} />
          </g>

          {/* ── RIGHT LEG ── */}
          <g
            transform={`translate(14, 56) rotate(${rightLegRot})`}
            style={{ transformOrigin: "14px 56px" }}
          >
            <rect x="-9"  y="0" width="20" height="28" rx="8" fill={C.pants} />
            <rect x="-8"  y="24" width="18" height="22" rx="7" fill={C.jacket} />
            <rect x="-8"  y="30" width="18" height="5" rx="2" fill={C.stripe} opacity="0.6" />
            <ellipse cx="2"  cy="48" rx="13" ry="8"  fill={C.shoe} />
            <ellipse cx="0"  cy="46" rx="10" ry="6"  fill="#5C4033" />
            <ellipse cx="-8" cy="50" rx="5"  ry="3"  fill={C.shoeSole} />
          </g>

          {/* ── NECK ── */}
          <rect x="-7" y="-52" width="14" height="16" rx="6" fill={C.skin} />

          {/* ═══════════════════════════
              HEAD GROUP  (rotates + offsets independently)
          ═══════════════════════════ */}
          <g
            transform={`translate(${headX}, -78) rotate(${headRot})`}
            style={{ transformOrigin: `${headX}px -78px` }}
          >
            {/* ── hair back ── */}
            <ellipse cx="0" cy="-2" rx="34" ry="32" fill={C.hair} />

            {/* ── head skin ── */}
            <ellipse cx="0" cy="4" rx="30" ry="28" fill={C.skin} />

            {/* ── hair top / sides ── */}
            <ellipse cx="0"   cy="-18" rx="30" ry="18" fill={C.hair} />
            <ellipse cx="-22" cy="-10" rx="11" ry="14" fill={C.hair} />
            <ellipse cx=" 22" cy="-10" rx="11" ry="14" fill={C.hair} />
            {/* hair strand */}
            <path d="M-6,-32 Q0,-44 6,-32" stroke={C.hairLight} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-14,-30 Q-10,-40 -4,-28" stroke={C.hairLight} strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* ── ears ── */}
            <ellipse cx="-29" cy="4" rx="5.5" ry="7" fill={C.skin} />
            <ellipse cx=" 29" cy="4" rx="5.5" ry="7" fill={C.skin} />
            <ellipse cx="-29" cy="4" rx="3"   ry="4.5" fill={C.skinDark} opacity="0.4" />
            <ellipse cx=" 29" cy="4" rx="3"   ry="4.5" fill={C.skinDark} opacity="0.4" />

            {/* ── FACE ── */}
            <Face expr={expr} />

            {/* ── HELMET ── */}
            <Helmet visible={showHelmet} />

            {/* ── thinking bubble ── */}
            {action === "thinking" && (
              <>
                <circle cx="32" cy="-28" r="5"   fill="white" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="40" cy="-36" r="4"   fill="white" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="48" cy="-44" r="9"   fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
                <text x="48" y="-40" fontSize="10" textAnchor="middle">🤔</text>
              </>
            )}
          </g>

          {/* ── CELEBRATE particles ── */}
          {action === "celebrate" && (
            <>
              <text
                x={-45 + sin(t * 3) * 8}
                y={-90 + cos(t * 2.5) * 12}
                fontSize="16" textAnchor="middle"
              >⭐</text>
              <text
                x={45 + sin(t * 2.5 + 1) * 8}
                y={-80 + cos(t * 3) * 10}
                fontSize="12" textAnchor="middle"
              >✨</text>
              <text
                x={-30 + sin(t * 4) * 5}
                y={-110 + cos(t * 3.5) * 15}
                fontSize="10" textAnchor="middle"
              >🎉</text>
            </>
          )}

          {/* ── WRONG X badge ── */}
          {action === "wrong" && (
            <g transform="translate(44, -80)">
              <circle r="14" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="2" />
              <text x="0" y="6" fontSize="14" textAnchor="middle" fill="#DC2626">✗</text>
            </g>
          )}

          {/* ── STOP hand label ── */}
          {action === "stop" && (
            <g transform={`translate(-68, ${-22 + leftArmRot * 0.3})`}>
              <circle r="18" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
              <text x="0" y="-4" fontSize="8"  textAnchor="middle" fill="white" fontWeight="bold">STOP</text>
              <text x="0" y="7" fontSize="12" textAnchor="middle">✋</text>
            </g>
          )}

          {/* ── POINT finger indicator ── */}
          {action === "point" && (
            <g transform="translate(-65, -60)">
              <text fontSize="16" textAnchor="middle">👉</text>
            </g>
          )}

          {/* ── READ SIGN ── */}
          {action === "read-sign" && (
            <g transform="translate(-60, -30)">
              <rect x="-16" y="-20" width="32" height="36" rx="4" fill="#22C55E" />
              <rect x="-13" y="-17" width="26" height="30" rx="3" fill="#16A34A" />
              <text x="0" y="4" fontSize="18" textAnchor="middle">🚶</text>
            </g>
          )}
        </g>
      </svg>

      {/* ── Name tag ── */}
      {showName && !!characterName && size >= 100 && (
        <div
          className="mt-1 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
            boxShadow: `0 4px 12px ${accentColor}44`,
            maxWidth: size + 20,
          }}
        >
          <span>⭐</span>
          <span className="truncate">{characterName}</span>
        </div>
      )}
    </div>
  );
}
