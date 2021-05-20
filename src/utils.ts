const negate = (n: number) => {
  return -Math.abs(n);
};

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
  position: 'left' | 'right' | 'top' | 'bottom',
  outerPadding: number,
  align: 'center' | 'start' | 'end'
) => {
  const response: { top: number | string; left: number | string } = {
    top: 0,
    left: 0,
  };
  switch (position) {
    case 'left':
      response.top = negate(size.height / 2 - childSize.height / 2);
      if (align === 'start') {
        response.top = 0;
      } else if (align === 'end') {
        response.top = negate(size.height - childSize.height);
      }
      response.left = negate(size.width + outerPadding);
      break;
    case 'right':
      response.top = negate(size.height / 2 - childSize.height / 2);
      if (align === 'start') {
        response.top = 0;
      } else if (align === 'end') {
        response.top = negate(size.height - childSize.height);
      }
      response.left = childSize.width + outerPadding;
      break;
    case 'top':
      response.left = negate(size.width / 2 - childSize.width / 2);
      if (align === 'start') {
        response.left = 0;
      } else if (align === 'end') {
        response.left = negate(size.width - childSize.width);
      }
      response.top = negate(size.height + outerPadding);
      break;
    case 'bottom':
      response.left = negate(size.width / 2 - childSize.width / 2);
      if (align === 'start') {
        response.left = 0;
      } else if (align === 'end') {
        response.left = negate(size.width - childSize.width);
      }
      response.top = childSize.height + outerPadding;
      break;
  }
  return response;
};
