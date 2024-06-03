import { createContext, useContext, useState, useEffect } from "react";
import Api from "../api/lakeApi";
const LakeContext = createContext({});

const LakeProvider = (props) => {
  useEffect(() => {
    getLakes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lakes, setLakes] = useState([]);
  const [searchedLakes, setSearchedLakes] = useState([]);

  const getLakes = async () => {
    const result = await Api.getAllLakes();
    setLakes(result);
    setSearchedLakes(result);
    return result;
  };

  const values = { lakes, setLakes, searchedLakes, setSearchedLakes};
  return (
    <LakeContext.Provider value={values}>{props.children}</LakeContext.Provider>
  );
};

const useLakeContext = () => {
  return useContext(LakeContext);
};
export { LakeProvider, useLakeContext };
