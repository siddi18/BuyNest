// import React from "react";
// import HomeProductSection from "../utils/HomeProductSection.jsx";
// import { dressPage1 } from "../Data/dress/page1.js";
// import { gounsPage1 } from "../Data/Gouns/gouns";
// import { kurtaPage1 } from "../Data/Kurta/kurta";
// import { mensShoesPage1 } from "../Data/shoes";
// import { useEffect, useState } from "react";
// import { lengha_page1 } from "../../../Data/Women/LenghaCholi";

// const Homepage = () => {

//   const [mensKurta, setMensKurta] = useState([]);

//   useEffect(() => {
//     const fetchMensKurta = async () => {
//       try {
//         const response = await fetch("https://buynest.onrender.com/api/products/category/Kurthas");
//         const data = await response.json();
//         setMensKurta(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchMensKurta();
//   }, []);


//   return (
//     <div className="">
//       <div className="space-y-10 py-20">
//         <HomeProductSection data={mensKurta} section={"Men's Kurta"} />
//         <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
//         <HomeProductSection data={lengha_page1} section={"Lengha Choli"} />
//         <HomeProductSection data={dressPage1} section={"Dress"} />
//         <HomeProductSection data={gounsPage1} section={"Women's Gouns"} />
//         <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} />
//       </div>
//     </div>
//   );
// };

// export default Homepage;

// import React, { useEffect, useState } from "react";
// import HomeProductSection from "../utils/HomeProductSection.jsx";

// const Homepage = () => {
//   const [mensKurta, setMensKurta] = useState([]);
//   const [mensShoes, setMensShoes] = useState([]);
//   const [lengha, setLengha] = useState([]);
//   const [dresses, setDresses] = useState([]);
//   const [gowns, setGowns] = useState([]);
//   const [womensKurtas, setWomensKurtas] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const urls = [
//           { stateSetter: setMensKurta, url: "https://buynest.onrender.com/api/products/category/Kurthas" },
//           { stateSetter: setMensShoes, url: "https://buynest.onrender.com/api/products/category/MensShoes" },
//           { stateSetter: setLengha, url: "https://buynest.onrender.com/api/products/category/womensLehengaCholi" },
//           { stateSetter: setDresses, url: "https://buynest.onrender.com/api/products/category/Dress" },
//           { stateSetter: setGowns, url: "https://buynest.onrender.com/api/products/category/Gown" },
//           { stateSetter: setWomensKurtas, url: "https://buynest.onrender.com/api/products/category/womensKurtha" }
//         ];

//         // Fetch all categories in parallel
//         const responses = await Promise.all(urls.map(({ url }) => fetch(url).then(res => res.json())));

//         // Update state for each category
//         urls.forEach(({ stateSetter }, index) => stateSetter(responses[index]));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="space-y-10 py-20">
//       <HomeProductSection data={mensKurta} section={"Men's Kurta"} />
//       <HomeProductSection data={mensShoes} section={"Men's Shoes"} />
//       <HomeProductSection data={lengha} section={"Lengha Choli"} />
//       <HomeProductSection data={dresses} section={"Dress"} />
//       <HomeProductSection data={gowns} section={"Women's Gowns"} />
//       <HomeProductSection data={womensKurtas} section={"Women's Kurtas"} />
//     </div>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from "react";
import HomeProductSection from "../utils/HomeProductSection.jsx";

const Homepage = () => {
  const [mensKurta, setMensKurta] = useState([]);
  const [mensShoes, setMensShoes] = useState([]);
  const [lengha, setLengha] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [gowns, setGowns] = useState([]);
  const [womensKurtas, setWomensKurtas] = useState([]);

  const [loadingState, setLoadingState] = useState({
    mensKurta: true,
    mensShoes: true,
    lengha: true,
    dresses: true,
    gowns: true,
    womensKurtas: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const urls = [
          { key: "mensKurta", setter: setMensKurta, url: "https://buynest.onrender.com/api/products/category/Kurthas" },
          { key: "mensShoes", setter: setMensShoes, url: "https://buynest.onrender.com/api/products/category/MensShoes" },
          { key: "lengha", setter: setLengha, url: "https://buynest.onrender.com/api/products/category/womensLehengaCholi" },
          { key: "dresses", setter: setDresses, url: "https://buynest.onrender.com/api/products/category/Dress" },
          { key: "gowns", setter: setGowns, url: "https://buynest.onrender.com/api/products/category/Gown" },
          { key: "womensKurtas", setter: setWomensKurtas, url: "https://buynest.onrender.com/api/products/category/womensKurtha" }
        ];

        const responses = await Promise.all(
          urls.map(({ url, key, setter }) =>
            fetch(url)
              .then(res => res.json())
              .then(data => {
                setter(data);
                setLoadingState(prev => ({ ...prev, [key]: false })); // Mark category as loaded
              })
          )
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-10 py-20">
      <HomeProductSection data={mensKurta} section={"Men's Kurta"} isLoading={loadingState.mensKurta} />
      <HomeProductSection data={mensShoes} section={"Men's Shoes"} isLoading={loadingState.mensShoes} />
      <HomeProductSection data={lengha} section={"Lengha Choli"} isLoading={loadingState.lengha} />
      <HomeProductSection data={dresses} section={"Dress"} isLoading={loadingState.dresses} />
      <HomeProductSection data={gowns} section={"Women's Gowns"} isLoading={loadingState.gowns} />
      <HomeProductSection data={womensKurtas} section={"Women's Kurtas"} isLoading={loadingState.womensKurtas} />
    </div>
  );
};

export default Homepage;
