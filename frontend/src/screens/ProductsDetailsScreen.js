import {
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { useGetProductQuery } from '../store/apiSlice';
const ProductsDetailsScreen = ({ route }) => {
  const id = route.params.id;

  const { data, isLoading, error } = useGetProductQuery(id);
  const product = data?.data;

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching the product. {error.error}</Text>;
  }

  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width, aspectRatio: 1 }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    letterSpacing: 1.5,
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#000',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductsDetailsScreen;
