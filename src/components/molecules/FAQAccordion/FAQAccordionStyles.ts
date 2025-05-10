// src/components/molecules/FAQAccordion/FAQAccordionStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  accordionItem: {
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 2,
    overflow: 'hidden',
  },
  accordionHeader: {
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 15,
    borderRadius: 15,
    marginTop: 5,
  },
});
