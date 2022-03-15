import { useState, useEffect } from "react";
import api from '../api/api'

const useFetch = () => {
  const [dataIsPresent,setDataIsPresent] = useState(false);
  const [apiData, setApiData] = useState('');
  const [responseError,setResponseError] = useState(false);

  useEffect(() => {
    const fetchApi = async () => { 
      try {
        // Fetch data from REST API
        const response = await api.get('./users.json')
        console.log(response)
        if (response.status === 200) {
          // Extract json
          const rawData = await response.data;
          setApiData(rawData);
          setDataIsPresent(true);
        } else {
          setDataIsPresent(false);
          setResponseError(true);
          console.error(`Error ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setDataIsPresent(false);
        setResponseError(true);
        console.error(`Error ${error}`);
      }
      // debugger
      // const dbRef = ref(getDatabase());
      // get(child(dbRef, `users/0`)).then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log(snapshot.val());
      //   } else {
      //     console.log("No data available");
      //   }
      // }).catch((error) => {
      //   console.error(error);
      // });
        }
        fetchApi();
      }, []);
      console.log(apiData);
      return {apiData,dataIsPresent,responseError};

};

export default useFetch;