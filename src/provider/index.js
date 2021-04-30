import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

  const [products, setProducts] = useState([])
//     {
//         id: 0,
//         amount: 5,
//     },
//     {
//         id: 1,
//         amount: 4,
//     },
//     {
//         id: 2,
//         amount: 2,
//     },
// ]);

  useEffect(() => {

    const productsStorage = localStorage.getItem("products");

    if (productsStorage) 
        setProducts(JSON.parse(productsStorage));

    else {
      setProducts([])
      // setProducts(JSON.parse(productsStorage));
        //     {
        //         id: 0,
        //         amount: 5,
        //     },
        //     {
        //         id: 1,
        //         amount: 4,
        //     },
        //     {
        //         id: 2,
        //         amount: 2,
        //     },
        // ]);
    }

  }, []);

  return (

    <AuthContext.Provider value={{ products, setProducts }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);