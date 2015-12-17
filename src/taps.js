let canTouch = false;
if ('ontouchstart' in window) {
  canTouch = true;
}

let currentTap = {
  x: 0,
  y: 0,
  taps: [],
  count: 0
};

function getTouchTap(e) {
  let tapList = e.touches || [];
  let tapCount = tapList.length;
  let taps = [];

  currentTap.count = tapCount;
  currentTap.taps = taps;

  if (tapCount > 0) {
    for (let i = 0; i < tapCount; i += 1) {
      taps.push({ x: tapList[i].clientX, y: tapList[i].clientY });
    }

    currentTap.x = taps[0].x;
    currentTap.y = taps[0].y;
  }

  return currentTap;
}

function getMouseTap(e) {
  currentTap.x = e.clientX;
  currentTap.y = e.clientY;
  currentTap.count = e.type === 'mouseup' ? 0 : 1;
  currentTap.taps = e.type === 'mouseup' ? [] : [{ x: currentTap.x, y: currentTap.y }];
  return currentTap;
}

let getTap = canTouch ? getTouchTap : getMouseTap;

let tapEvents = {
  start: canTouch ? 'touchstart' : 'mousedown',
  move: canTouch ? 'touchmove' : 'mousemove',
  end: canTouch ? 'touchend' : 'mouseup'
};

export {
  canTouch,
  getTap,
  getTouchTap,
  getMouseTap,
  currentTap,
  tapEvents
};
