import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  hongkong: {
    fontFamily: 'HongKong',
  },
  white: {
    color: 'white',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    width: '100%'
  },
  title: {
      fontSize: 30,
      fontFamily: 'Broadway',
  },
  borderBottom:{
    borderWidth: 1,
    borderRightWidth:0,
    borderLeftWidth:0,
    borderTopWidth:0,
    borderBottomColor: 'white',
  }
});

export default globalStyles;