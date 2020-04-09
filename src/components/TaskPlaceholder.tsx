export enum PlaceholderPlacement {
  Top = "top",
  Bottom = "bottom"
}

export function placeholderNodeExists(placement: PlaceholderPlacement): Boolean {
  return document.getElementsByClassName(`placeholder-${placement}`).length > 0;
}

export function getPlaceholderNode(placement: PlaceholderPlacement) {
  const node = document.createElement('div');
  node.className = `placeholder-${placement} placeholder`;
  node.innerHTML = '<p>Insert here</p>'

  return node;
}
