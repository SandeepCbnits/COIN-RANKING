import React, { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Pagination";
const App = () => {
  const [coinDatas, setCoinDatas] = useState([]);
  const [coinFilter, setCoinFilter] = useState("");
  const [currentPage, setCurrentPage]=useState(1);
  const [postPerPage]=useState(10);


  let fetchData = ()=>{
    fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      setCoinDatas(data.data.coins);
    });
  }

  const onSearchData = (e) => {      
    setCoinFilter(e.target.value);
    if(e.target.value){
      const result = coinDatas.filter((list) =>
      list.name.toLowerCase().includes(coinFilter.toLowerCase())
    );
    setCoinDatas(result);
    }else{
     fetchData()
    } 
  };

  useEffect(() => {   
    fetchData()
  }, []);
  
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost =indexOfLastPost - postPerPage;
  let currentPosts = coinDatas.slice(indexOfFirstPost, indexOfLastPost);


  const paginate=(pageNumber)=>setCurrentPage(pageNumber)
  
  return (
    <div>
      <div className="form">
        <div>
          <h3>Currency Ranking</h3>
        </div>
        <div>
          <input type="text"  onChange={onSearchData} />
        </div>
      </div>
      <div>
          {/* <--------------------------Table ----------------------------> */}
        <table>
          <thead>
            <th>Currency Rank</th>
            <th>Currency Name</th>
            <th>Currency Symbole</th>
            <th>Currency Price</th>
            {/* <th>Currency Price Change</th> */}
          </thead>
            {/* <--------------------------Table Body----------------------------> */}
          <tbody>
            {currentPosts.map((coin) => {
              return (
                <tr key={coin.uuid}>
                  <td>{coin.rank}</td>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.price}</td>
                  {/* <td>
                    <img src="" alt="" />{" "}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Pagination postsPerPage={postPerPage} totalPosts={coinDatas.length} paginate={paginate}/>
        </div>
      </div>
    </div>
  );
};

export default App;
