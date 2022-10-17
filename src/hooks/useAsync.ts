import { ApiResponse } from "models";
import { DependencyList, useEffect, useState } from "react";

type asyncFnType<T> = () => Promise<ApiResponse<T>>;

const useAsync = <T>(asyncFn: asyncFnType<T>, deps: DependencyList = []) => {
  const [response, setResponse] = useState<ApiResponse<T>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    asyncFn().then((response) => {
      if (isActive) {
        setLoading(false);
        setResponse(response);
      }
    });

    return () => {
      isActive = false;
    };
  }, deps);

  return { response, loading };
};

export default useAsync;

// import { AxiosResponse } from "axios";
// import { ApiResponse } from "models";
// import { DependencyList, useEffect, useState } from "react";

// type asyncFnType<T> = () => Promise<ApiResponse<T>>;

// type successFnType<T> = (result: ApiResponse<T>) => void;

// const useAsync = <T>(
//   asyncFn: asyncFnType<T>,
//   successFn?: successFnType<T>,
//   returnFn?: Function,
//   deps: DependencyList = []
// ) => {
//   useEffect(() => {
//     let isActive = true;

//     asyncFn().then((response) => {
//       isActive && successFn && successFn(response);
//     });

//     return () => {
//       returnFn && returnFn();
//       isActive = false;
//     };
//   }, deps);
// };

// export default useAsync;
