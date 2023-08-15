export function animateElement(
  animateRules,
  nodeToAnimate,
  animDirection,
  animDuration,
  animDelay = '0',
) {
  nodeToAnimate.animate(animateRules, {
    direction: animDirection,
    fill: 'forwards',
    duration: animDuration,
    animDelay,
  });
}
