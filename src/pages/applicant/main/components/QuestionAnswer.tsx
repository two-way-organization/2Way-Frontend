import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

interface QuestionAnswerProps {
  question: string;
  response: string;
  analyzed: string;
  showResponse: number | null;
  setShowResponse: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

export const QuestionAnswer = React.memo<QuestionAnswerProps>(({ question, response, analyzed, showResponse, setShowResponse, index }) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.row}>
        <Text style={styles.questionIndexText}>Q{index+1}</Text>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.questionResponseContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowResponse(showResponse === index ? null : index)}
        >
          <Text style={styles.questionResponseText}>
            {showResponse === index ? response : analyzed}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 4,
  },
  questionText: {
    color: 'black',
    fontSize: 13,
  },
  questionResponseContainer: {
    marginTop: 8,
  },
  questionResponseText: {
    color: '#8C8C8C',
    fontSize: 10,
  },
  questionIndexText: {
    color: '#EB4335',
    fontSize: 13,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
