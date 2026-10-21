import "@/components/iso/iso.css";
import { IsoFigure, Solid } from "@/components/iso/react/draw";

import { LETTERS, NEAR_CLIP, PLANET, RING } from "./geometry";
import { HEIGHT, WIDTH } from "./view";

export function MarkFigure() {
  return (
    <div className="iso">
      <IsoFigure
        width={WIDTH}
        height={HEIGHT}
        label="The Halmahera mark. A letter H stands in a ring. A small planet sits on the ring."
      >
        <defs>
          <clipPath id="mark-near">
            <polygon points={NEAR_CLIP} />
          </clipPath>
        </defs>
        <Solid paths={RING} tone="mid" />
        {LETTERS.map(function renderLetter(part, index) {
          return <Solid key={index} paths={part.paths} tone="hi" lit />;
        })}
        <g clipPath="url(#mark-near)">
          <Solid paths={RING} tone="mid" />
        </g>
        <Solid paths={PLANET} tone="hi" />
      </IsoFigure>
    </div>
  );
}
