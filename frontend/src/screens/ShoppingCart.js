import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CartListITem from '../components/CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDeliveryPrice,
  selectSubTotal,
  selectTotal,
  cartSlice,
} from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  console.log(error, isLoading);

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: 'Jignesh Sharma',
        address: 'Rajasthan, Udaipur - Debari, Jharno ki saray-92 ',
        email: 'jignesh.sharma.707@gmail.com',
      },
    });

    if (result.data?.status === 'OK') {
      Alert.alert(
        'Order has been submitted',
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };
  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListITem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.textButton}>
          Checkout{isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,

    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  textButton: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
});
export default ShoppingCart;
