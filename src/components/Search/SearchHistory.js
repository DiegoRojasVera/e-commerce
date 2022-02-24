import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { map } from 'lodash';
import { getSearchHistoryApi } from '../../api/search';
import colors from '../../../styles/colors';

export default function SearchHistory(props) {
  const { showHistory, countainerHeight, onSearch } = props;
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (showHistory) {
      (async () => {
        const response = await getSearchHistoryApi();
        // console.log(response);
        setHistory(response);
      })();
    }
  }, [showHistory]);

  return (

    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: countainerHeight },
      ]}>
      <View>
        {history &&
          map(history, (item, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => onSearch(item.search)}>

              <View>
                <View style={styles.historyItem}>
                  <Text style={styles.text}>{item.search}</Text>
                  <AwesomeIcon name="arrow-right" size={16} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  history: {
    zIndex:2,
    position: 'absolute',
    backgroundColor: colors.bgLight,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: '#53005f',
    fontSize: 16,
    fontWeight: 'bold',
  },

});