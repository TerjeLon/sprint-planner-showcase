import React from 'react';

/**
 *
 * @param element HTMLElement to search in
 * @param className Class to find
 *
 * @returns True if an element with `classname` exists inside `element`
 */
export function elementContainsChildrenWithClass(element: HTMLElement, className: string): Boolean {
  const children: HTMLElement[] = [].slice.call(element.children);
  const elementsContainingClass = children.map((child: HTMLElement) => child.classList.contains(className));

  return elementsContainingClass.length > 1;
}

/**
 * When dragging an element, use this method for finding the closest element with a certain class
 *
 * @param className Class to find
 * @param inNode Parent node that should contain the element
 * @param event DragEvent to use for finding coordinates
 *
 * @returns Closest element to the given DragEvent coordinates
 */
export function getClosestElementWithClassToDragEvent(className: string, inNode: Element | undefined, event: React.DragEvent<HTMLDivElement>): Element | undefined {
  if (!inNode) {
    return undefined;
  }

  const elements = Array.from(document.getElementsByClassName(className))
      .filter( element => element.parentNode === inNode)
      .filter( element => !element.classList.contains('dragging'));

  const elementCoords = elements.map(link => {
    let rect = link.getBoundingClientRect();
    return [rect.x, rect.y];
  });

  let distances: number[] = [];
  elementCoords.forEach(coordinates => {
    let distance = Math.hypot(coordinates[0] - event.clientX, coordinates[1] - event.clientY);
    distances.push(distance);
  });

  let closestElementIndex = distances.indexOf(Math.min(...distances));

  return elements[closestElementIndex];
}
