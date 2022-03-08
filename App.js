import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/Focus';
import {Timer} from './src/features/Timer'
import {FocusHistory} from './src/features/FocusHistory'
const App = () => {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history,setHistory]=useState([]);
  return (
    <View style={styles.container}>
      {!currentSubject ? (
        <>
        <Focus addSubject={setCurrentSubject} />
        <FocusHistory history={history}/>
        </>
      ) : (
        <Timer focusSubject={currentSubject} onTimeEnd={() => {}} clearSubject={() => setCurrentSubject(null)} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
  },
});
export default App;
