import axios from "axios";
import { useEffect, useState } from "react";


export function useApi(url) {
    const [dataList,setDataList]=useState([]);

  async  function getData() {
        let {data} = await axios.get (url)
    
    setDataList(data.data)
    }

    useEffect(()=>{
        getData()
    },[])

return {dataList}

}