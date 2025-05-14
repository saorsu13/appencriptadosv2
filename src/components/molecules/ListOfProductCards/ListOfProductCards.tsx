// src/components/molecules/ListOfProductCards/ListOfProductCards.tsx
import React from 'react';
import { View } from 'react-native';
import CardProductItem, { TypeOfProduct } from '@/components/molecules/CardProductItem/CardProductItem';
import { styles } from './ListOfProductCardsStyles';
import { Product } from '@/features/product/types';


export interface ListOfProductCardsProps {
  list: Product[];
  type: TypeOfProduct;
  widthImage: number;
  heightImage: number;
  showPeriodSelector?: boolean;
}

const ListOfProductCards: React.FC<ListOfProductCardsProps> = ({
  list,
  type,
  widthImage,
  heightImage,
  showPeriodSelector = false,
}) => {
  const isOdd = list.length % 2 !== 0;
  const updatedList = isOdd ? [list[list.length - 1], ...list.slice(0, -1)] : list;

  return (
    <View style={[styles.gridContainer, type === 'phone' && styles.phoneGrid]}>      
      {updatedList.map((product, index) => (
       <CardProductItem
          key={product.id.toString()}
          widthImage={widthImage}
          heightImage={heightImage}
          type={type}
          product={product}
          isFirstItem={isOdd && index === 0}
          showPeriodSelector={showPeriodSelector}
        />
      ))}
    </View>
  );
};

export default ListOfProductCards;
