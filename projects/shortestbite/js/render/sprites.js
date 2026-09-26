/** Small canvas-path drawing helpers for movers and pins. */

/** Draw a mover as a coloured dot with a heading arrow. */
export function drawMover(ctx, x, y, headingRad, color, radius = 5) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (Number.isFinite(headingRad)) {
    ctx.rotate(headingRad);
    ctx.beginPath();
    ctx.moveTo(radius + 6, 0);
    ctx.lineTo(radius + 1, -3);
    ctx.lineTo(radius + 1, 3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();
}

/** Draw a teardrop pin marker (start or end). */
export function drawPin(ctx, x, y, color, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, -12, 8, 0, Math.PI * 2);
  ctx.moveTo(-6, -7);
  ctx.quadraticCurveTo(0, 4, 0, 4);
  ctx.quadraticCurveTo(0, 4, 6, -7);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (label) {
    ctx.fillStyle = '#0b0e12';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, -12);
  }
  ctx.restore();
}
