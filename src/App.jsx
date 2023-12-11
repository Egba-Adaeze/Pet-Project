import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    myApi();
  }, [page]);

  const myApi = async () => {
    try {
      const res = await axios.get(
        `https://randomuser.me/api/?results=12&page=${page}`
      );
      
      const results = res.data.results;
      if (page > 1) {
        setDatas((pre) => [...pre, ...results]);
      } else {
        setDatas(results);
      }

    
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
          {datas.map((data, k) => (
            <div key={k} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={data?.picture?.large}
                alt="cover-image"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {data?.name?.title}. {data?.name?.first} {data?.name?.last}
                </div>
                <p className="text-gray-700 text-base">
                  Location: {data?.location?.street?.name}
                </p>
                <p className="text-gray-700 text-base">Phone: {data?.phone}</p>
                <p className="text-gray-700 text-base">Gender: {data?.gender}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={() => setPage((pre) => pre + 1)}
          className="border p-1"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default App;
