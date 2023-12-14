import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  fileItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderBottomColor: '#e1e1e1',
    width: '100%',
  },
  fileIndexNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIndex: {
    color: '#EB4335',
    fontSize: 13,
  },
  fileName: {
    color: '#000000',
    fontSize: 13,
    marginLeft: 18,
  },
  downloadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center', // 버튼 내용 중앙 정렬
    alignItems: 'center', // 가로축 중앙 정렬
    width: '100%', // 버튼 너비
    paddingVertical: 15,
    marginVertical: 17,
  },
  downloadButtonText: {
    color: '#0075FF',
    fontSize: 14,
  },
});

interface FileDownloadButtonProps {
  files: { name: string; uri: string }[];
}

export const FileDownloadButton: React.FC<FileDownloadButtonProps> = ({ files }) => {
  const handlePress = async (uri: string) => {
    await WebBrowser.openBrowserAsync(uri);
  };

  return (
    <View style={styles.container}>
      {files.map((file, index) => (
        <View key={index} style={styles.fileItem}>
          <View style={styles.fileIndexNameContainer}>
            <Text style={styles.fileIndex}>{index + 1}</Text>
            <Text style={styles.fileName}>{file.name}</Text>
          </View>
          <TouchableOpacity onPress={() => handlePress(file.uri)} style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>{file.uri.split('/').pop()}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

