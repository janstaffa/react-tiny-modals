export const checkBoundingBox = (
  el: HTMLDivElement,
  top: number | string,
  left: number | string
): boolean => {
  if (typeof top === 'string') {
    top = parseInt(top);
  }
  if (typeof left === 'string') {
    left = parseInt(left);
  }
  const rect = el.getBoundingClientRect();

  const realX = rect.x + left;
  const realY = rect.y + top;

  return (
    realX < 0 ||
    realY < 0 ||
    realX + rect.width > window.innerWidth ||
    realY + rect.height > window.innerHeight
  );
};

export const calcTranslate = (
  size: { width: number; height: number },
  childSize: { width: number; height: number },
  position: string,
  outerPadding: number
) => {
  const response: { top: number | string; left: number | string } = {
    top: 0,
    left: 0,
  };
  switch (position) {
    case 'left':
      response.left = `-${size.width + outerPadding}`;
      break;
    case 'right':
      response.left = childSize.width + outerPadding;
      break;
    case 'top':
      response.top = `-${size.height + outerPadding}`;
      break;
    case 'bottom':
      response.top = childSize.height + outerPadding;
      break;
  }
  return response;
};
