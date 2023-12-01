import gsap from "gsap";
import { Flip } from "gsap/all";
import { includes, union, without } from "lodash";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
gsap.registerPlugin(Flip);

function toggleElement(array, element) {
  if (includes(array, element)) {
    // Element exists, remove it
    return without(array, element);
  } else {
    // Element doesn't exist, add it
    return union(array, [element]);
  }
}

const data = ["#343a40", "#343a40", "#5e6876", "#5e6876", "#343a40", "#5e6876", "#343a40", "#343a40", "#343a40", "#5e6876", "#343a40", "#5e6876", "#5e6876", "#5e6876", "#343a40"];

export const FlipPlugin = () => {
  const [filters, setFilters] = useState(["#343a40", "#5e6876"]);
  const elements = useRef([]);

  const setRefs = (e, i) => {
    const { current } = elements;
    current[i] = e;
  };

  useLayoutEffect(() => {
    // 1) returns a state object containing data about the elements' current position/size/rotation in the viewport
    const state = Flip.getState(elements.current);

    // 2) make state changes example filtering
    elements.current.forEach((el) => {
      el.style.display = el.getAttribute("display") === "true" ? "block" : "none";
    });

    // 3) call Flip.from method, compares state object and current positions and animates the offsets
    Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      absolute: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0, borderRadius: "50%" }, { opacity: 1, scale: 1, borderRadius: "4px", duration: 1 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, borderRadius: "50%", duration: 1 }),
    });
  }, [filters]);

  return (
    <>
      <GridContainer>
        {data.map((color, index) => (
          <GridItem
            key={index}
            className="gridItem"
            $bgColor={color}
            display={filters.includes(color).toString()}
            ref={(el) => setRefs(el, index)}
          />
        ))}
      </GridContainer>
      <FilterContainer>
        <Button onClick={() => setFilters((prev) => toggleElement(prev, "#343a40"))}>#343a40</Button>
        <Button onClick={() => setFilters((prev) => toggleElement(prev, "#5e6876"))}> #5e6876</Button>
      </FilterContainer>
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem 5rem 5rem 5rem 5rem;
  grid-gap: 1rem;
`;

const GridItem = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${(props) => props.$bgColor};
  border-radius: 4px;
  /* display: ${(props) => (props.$display ? "block" : "none")}; */
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 1.6rem;
  border: 1px solid #dee2e6;
  cursor: pointer;
  background-color: white;
`;
