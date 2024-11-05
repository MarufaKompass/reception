import React from 'react';
import { useAppContextReception } from 'AppContextReception';
export default function PropertyProfile() {
  const { propertyUser, setPropertyUser } = useAppContextReception();
  console.log('propertyUser', propertyUser);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/reception/prtprofile')
        .then((res) => {
          setPropertyUser(res);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [setPropertyUser]);

  return <div></div>;
}
