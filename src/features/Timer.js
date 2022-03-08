import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake'
import { Countdown } from '../components/countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

const onEnd = (reset) => {
  Vibration.vibrate(PATTERN);
  setIsStarted(false);
  setProgress(1);
  setMinutes(0.1);
  reset();
}

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: 40 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#1e90ff"
          style={{ height: 8, marginLeft: 10, marginRight: 10, paddingTop: 20 }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton title="Cancel" size={75} onPress={clearSubject} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: 'white',
    textAlign: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
