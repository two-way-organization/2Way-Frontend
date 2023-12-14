import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ScoreMap {
  [key: number]: { name: string, color: string };
}
interface ScoreProps {
  score: number;
}

const scoreMap: ScoreMap = {
  1: { name: 'Bronze V', color: 'brown' },
  2: { name: 'Bronze IV', color: 'brown' },
  3: { name: 'Bronze III', color: 'brown' },
  4: { name: 'Bronze II', color: 'brown' },
  5: { name: 'Bronze I', color: 'brown' },
  6: { name: 'Silver V', color: 'silver' },
  7: { name: 'Silver IV', color: 'silver' },
  8: { name: 'Silver III', color: 'silver' },
  9: { name: 'Silver II', color: 'silver' },
  10: { name: 'Silver I', color: 'silver' },
  11: { name: 'Gold V', color: 'gold' },
  12: { name: 'Gold IV', color: 'gold' },
  13: { name: 'Gold III', color: 'gold' },
  14: { name: 'Gold II', color: 'gold' },
  15: { name: 'Gold I', color: 'gold' },
  16: { name: 'Platinum V', color: 'turquoise' },
  17: { name: 'Platinum IV', color: 'turquoise' },
  18: { name: 'Platinum III', color: 'turquoise' },
  19: { name: 'Platinum II', color: 'turquoise' },
  20: { name: 'Platinum I', color: 'turquoise' },
  21: { name: 'Diamond V', color: 'skyblue' },
  22: { name: 'Diamond IV', color: 'skyblue' },
  23: { name: 'Diamond III', color: 'skyblue' },
  24: { name: 'Diamond II', color: 'skyblue' },
  25: { name: 'Diamond I', color: 'skyblue' },
  26: { name: 'Ruby V', color: 'crimson' },
  27: { name: 'Ruby IV', color: 'crimson' },
  28: { name: 'Ruby III', color: 'crimson' },
  29: { name: 'Ruby II', color: 'crimson' },
  30: { name: 'Ruby I', color: 'crimson' },
  31: { name: 'Master', color: 'brown' },
};

const getColorAndName = (score: number) => {
  const { name, color } = scoreMap[score] || { name: 'Unknown', color: 'black' };
  return { name, color };
};

export const ScoreName: React.FC<ScoreProps> = ({ score }) => {
  const { name, color } = getColorAndName(score);

  return (
    <Text style={[styles.text, { color: color, fontWeight: '900' }]}>{name}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
