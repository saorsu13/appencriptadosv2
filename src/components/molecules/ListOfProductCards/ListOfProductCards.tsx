// src/components/molecules/ListOfProductCards/ListOfProductCards.tsx
import React from 'react';
import { View } from 'react-native';
import CardProductItem, { TypeOfProduct } from '@/components/molecules/CardProductItem/CardProductItem';
import { styles } from './ListOfProductCardsStyles';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category: string;
}

export interface ListOfProductCardsProps {
  list: Product[];
  type: TypeOfProduct;
  widthImage: number;
  heightImage: number;
}

const ListOfProductCards: React.FC<ListOfProductCardsProps> = ({
  list,
  type,
  widthImage,
  heightImage,
}) => {
  const isOdd = list.length % 2 !== 0;
  const updatedList = isOdd ? [list[list.length - 1], ...list.slice(0, -1)] : list;

  return (
    <View style={[styles.gridContainer, type === 'phone' && styles.phoneGrid]}>      
      {updatedList.map((product, index) => (
        <CardProductItem
          key={product.id}
          widthImage={widthImage}
          heightImage={heightImage}
          type={type}
          product={product}
          isFirstItem={isOdd && index === 0}
        />
      ))}
    </View>
  );
};

export default ListOfProductCards;
