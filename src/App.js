import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';

function App() {
  const [products,setProducts]=useState([]);
  const [pages,setPages]=useState(1);
  const [totalPages,setTotalPages] =useState(0);


  const fetchProducts =async() =>{
    const res =await fetch("https://dummyjson.com/products?limit=100")
     
    const data =await res.json();
     
    console.log(data);
    
    if(data && data.products){
      setProducts(data.products)
      setTotalPages(data.total/10)
    }



    console.log(data);
  };

  useEffect(() =>{
    fetchProducts()
  },[])

const selectPageHandler=(selectedPage)=>{
 if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage!==pages)
 
  setPages(selectedPage);
}


  return (
    <div >
     {
      products.length>0 && <div className="products">
      {
        products.slice(pages*10-10,pages*10).map((prod)=>{
          return( <span className="products__single" key={prod.id}>
           <img src={prod.thumbnail}  alt={prod.title} />
           <span>{prod.title}</span>
          </span>);
        })}
      </div>
     }
     {
      products.length>0 &&<div className="pagination">
      <span  onClick={()=>selectPageHandler(pages-1)}></span>
      <span>🤛</span>
      {
        [...Array(products.length /10)].map((_,  i)=>{

           return (
            <span className={pages === i+1?"pagination__selected":""}
            onClick={()=>selectPageHandler(i+1)} key={i}>{i+1}</span>);

         })
      }
      
      <span onClick={()=>selectPageHandler(pages+1)}
      
      className ={page<products.length/10?"":"pagination__disable"}>🤜</span>
      
      </div>
     }
    </div>
  );
}

export default App;
