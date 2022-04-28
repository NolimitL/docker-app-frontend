import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import {useForm} from "react-hook-form";

interface IProductForm{
    product: string
    price: string
}

function App(): JSX.Element {
    const [products, setProducts] = useState([])

    const {
        handleSubmit,
        register
    } = useForm<IProductForm>()

  useEffect(() => {
      ;(async () => {
          await fetchProducts()
      })()
  }, [])

    async function fetchProducts(){
        const {data} = await axios.get('http://18.195.30.50:80/products')
        if(data){
            setProducts(data)
        }
    }
    async function handleOnSubmit(data: any){
        console.log(data)
        await axios.post('http://18.195.30.50:80/product', data)
        await fetchProducts()
    }

  return (
    <div className="App">
      <header className="App-header">
          <h3>Product list</h3>
          <div>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                  <div>
                    <input title="Product" type="text" {...register('product')}/>
                  </div>
                  <div>
                    <input title="Price" type="text" {...register('price')} />
                  </div>
                  <button type="submit" title="Add product">Add product</button>
              </form>
          </div>

          {products.length !== 0 ?
              (<ul> {products?.map((product: any) => {
                return (
                    <li id={product.id}>
                        <div style={{marginBottom: "15px"}}>
                            {product.product} - <span>{product.price}</span>
                        </div>
                    </li> )
              })}

        </ul>) : <></>
          }
      </header>
    </div>
  );
}

export default App;
