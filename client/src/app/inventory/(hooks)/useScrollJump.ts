import { useState, useRef } from "react";

export const useScrollJump = (
  sections: string[],
  scrollAreaRef: React.RefObject<HTMLDivElement>,
) => {
  const [positionId, setPositionId] = useState(0);

  function scrollToSection(sectionId: string) {
    if (scrollAreaRef.current) {
      const section = scrollAreaRef.current.querySelector(`#${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setPositionId(sections.indexOf(sectionId));
  }

  return {
    positionId,
    setPositionId,
    scrollToSection,
  };
};
