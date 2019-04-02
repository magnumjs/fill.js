export default function getPathIndex(p) {
  var s =
    p &&
    parseInt(
      p
        .split('[')
        .pop()
        .slice(0, -1)
    );
  if (!s) return 0;
  return parseInt(s) - 1;
}
