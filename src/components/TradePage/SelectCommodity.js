import React, { useState } from "react";
import goldicon from "../asset/images/gold.png";
import silvericon from "../asset/images/silver.png";
import "react-widgets/styles.css";
import Select, { components } from "react-select";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#13407B",
    border: "0",
    boxShadow: "none",
    height: "2.3em",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#13407B",
      color: "white", //option text color
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  singleValue: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "white",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "white",
    },
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "gray",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};

class SelectCommodity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemselect: "" };
  }

  _onChange(value) {
    this.props.func(value.value);
    console.log(value.value);
    // - just to see what we recive from <Select />
    this.setState({ itemselect: value });
  }

  render() {
    const options = [
      {
        label: "Gold",
        value: "Xau",
        // icon: <img src={silvericon} height="30px" width="30px" />,
        // test: "Gold",
      },
      {
        label: "Palladium",
        value: "frxXPDUSD",
        // icon: <img src={silvericon} height="30px" width="30px" />,
        // test: "Palladium",
      },
      {
        label: "Platinium",
        value: "frxXPTUSD",
        // icon: <img src={silvericon} height="30px" width="30px" />,
        // test: "Platinium",
      },
      {
        label: "Silver",
        value: "frxXAGUSD",
        // icon: <img src={silvericon} height="30px" width="30px" />,
        // test: "Silver",
      },
    ];

    return (
      <Select
        styles={colourStyles}
        name="form-field-name"
        value={this.state.itemselect}
        options={options}
        defaultValue={options[0]}
        searchable={false}
        className="w-full m-auto mr-5 text-xl font-bold"
        onChange={this._onChange.bind(this)}
      />
    );
  }
}

export default SelectCommodity;
