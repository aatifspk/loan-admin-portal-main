import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useDispatch } from "react-redux";
import { filterAgent } from "@/redux/slices/Agent/FilterAgent";
const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setValue(e.target.value);
    // setFilter(e.target.value || undefined);
    setTimeout(() => {
      dispatch(filterAgent(newkeyWord))
        .then((res) => {
          setFilter(res.payload.data.listAgents);
        })
        .catch((error) => console.log(error, "error"));
    }, 1000);
  };
  return (
    <div>
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="search..."
      />
    </div>
  );
};

export default GlobalFilter;

// const [filterData, setFilterData] = useState();
//   const [keyWord, setkeyWord] = useState("");
// let keyWord = "";
//   const handleFilter = (e) => {
//     let newkeyWord = e.target.value;
//     setkeyWord(newkeyWord);
//     setTimeout(() => {

//     }, 1000);
//   };
