import axios from 'axios';
export const fetchGPSData = async () => {
  const response = await axios.get('https://0756eapi5l.execute-api.us-east-1.amazonaws.com/p/position', {
    headers: {
      'x-api-key': 'LyjdSkL78IxYwPH1I9xScetE9qft',
    },
    params: {
      from: 1754570224,
    }
  });
  console.log(response.data);
  const responseData = response.data;
  const rawData = Array.isArray(responseData) 
    ? responseData 
    : responseData?.position || [];
  
  return rawData.map((item: any, index: number) => ({
    ...item,
    key: `${item.unitid}_${index}`,
  }));
};