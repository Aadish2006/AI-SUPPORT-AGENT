export function calculateConfidence({ retrievalScore = 0, sourceCount = 0, answer }) {
  const retrievalComponent = Math.min(Math.max(retrievalScore, 0), 1) * 0.65;
  const sourceComponent = Math.min(sourceCount / 3, 1) * 0.2;
  const answerComponent = answer && answer.length > 40 ? 0.15 : 0.05;

  return Number((retrievalComponent + sourceComponent + answerComponent).toFixed(4));
}
