import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error Fetching Products: {error.error}</Text>;
  }
  const products = data.data;
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            // before navigating we want to dispatch or update selected project
            // dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate('Product Details', { id: item._id });
          }}
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  itemContainer: {
    width: '50%',
    padding: 1,
  },
});
