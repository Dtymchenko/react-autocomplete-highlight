import "./App.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import reactStringReplace from "react-string-replace";
import Input from "./components/Input";
import Item from "./components/Item";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [matchItems, setMatchItems] = useState([]);

  const light = useCallback((filter, str) => {
    if (filter.trim()) {
      const arr = filter?.split(" ");

      return arr?.reduce((acc, el) => {
        acc = reactStringReplace(
          acc,
          new RegExp(`(${el})`, "gi"),
          (match, index, offset) => {
            if (match) {
              return (
                <span
                  key={`${match}-${index}-${offset}`}
                  style={{ backgroundColor: "yellow" }}
                >
                  {match}
                </span>
              );
            }
          }
        );
        return acc;
      }, str);
    }
    return str;
  }, []);

  const findMatch = (e) => {
    if (e.target.value.trim().length) {
      const matches = items.filter((item) =>
        JSON.stringify(item)
          .replace(
            /\"geo\":\{\"lat\":\"-?\d+.?\d*\",\"lng\":\"-?\d*.?\d*\"\}/gi,
            ""
          )
          .replace(/\"id\":\d,\"name\":*/gi, "")
          .replace(/\"username\"/gi, "")
          .replace(/\"email\"/gi, "")
          .replace(/\"address\"/gi, "")
          .replace(/\"street\"/gi, "")
          .replace(/\"suite\"/gi, "")
          .replace(/\"city\"/gi, "")
          .replace(/\"zipcode\"/gi, "")
          .replace(/,/gi, "")
          .replace(/\"phone\".*/gi, "")
          .toUpperCase()
          .includes(e.target.value.toUpperCase())
      );
      setMatchItems(matches);
    } else {
      setMatchItems(items);
    }
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    findMatch(e);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setItems(response.data);
        setMatchItems(response.data);
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      } finally {
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div>
        <Input inputValue={inputValue} onChangeInput={onChangeInput} />
        <div className="items">
          {matchItems.map((el, i) => (
            <Item
              item={el}
              key={i}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setMatchItems={setMatchItems}
              light={light}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
