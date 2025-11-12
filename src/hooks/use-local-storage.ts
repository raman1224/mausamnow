import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string, initialValue:T){   //key is data will be stored i n local storage, initialvalue is the default value
const [storedValue, setStoreValue] = useState<T>(()=> {

    try{
      const item = window.localStorage.getItem(key);   // key is used to get the item from local storage
      return item ? JSON.parse(item) : initialValue;  //json parse() is convert json string  to js object  format
    } catch (error){
     console.error(error);
     return initialValue;
    }
})  

useEffect(()=>{
 try{
      window.localStorage.setItem(key, JSON.stringify(storedValue));  //stringify is convet js to json format
    } catch (error){
     console.error(error);
    }
}, [key, storedValue]);
return [storedValue, setStoreValue] as const;
}