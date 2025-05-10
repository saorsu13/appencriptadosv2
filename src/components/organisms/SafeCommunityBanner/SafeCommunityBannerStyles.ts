// src/components/organisms/SafeCommunityBanner/SafeCommunityBannerStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 70,
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    rowGap: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#E3F8FF',
    fontWeight: '400',
  },
  textSubtitle: {
    textAlign: 'center',
    fontSize: 44,
    color: '#10B4E7',
    fontWeight: '700',
  },
  textDescription: {
    width: 280,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#E3F8FF',
  },
});
