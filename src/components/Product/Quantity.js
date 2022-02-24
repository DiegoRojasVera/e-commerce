import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";


export default function Quantity(props) {
  const { quantity, setQuantity } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
  ]);

  return (

    <DropDownPicker
      listMode="SCROLLVIEW"
      defaultValue={quantity}
      open={open}
      items={items}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      containerStyle={styles.containerStyle}
      itemStyle={styles.itemStyle}
      dropDownStyle={styles.dropDownPicker}
      style={styles.dropDownPicker}
      labelStyle={styles.labelStyle}
      onChangeValue={(value) => {
        setQuantity(value);
        //console.log(value);
      }}
      placeholder="Cantidad"
      
    />

  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 20,
    width: 120,
    marginBottom: 20,
    
  },
  itemStyle: {
    justifyContent: "flex-start",

  },
  dropDownStyle: {
    backgroundColor: "#fafafa",

  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
    zIndex: 2,
    marginBottom: 10,

  },
  labelStyle: {
    color: "#000",

  },
});
