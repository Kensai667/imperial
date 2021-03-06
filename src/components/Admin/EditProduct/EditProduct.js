import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '../../../assets/img/edit.png'
import DeleteIcon from '../../../assets/img/x.png'
import { productsContext } from '../../../Contexts/ProductsContext'
import EditModal from '../EditModal/EditModal'
import './EditProduct.css'

const EditProduct = () => {
  const { handleEditProduct, handleDeleteProduct, isEdit, getProducts, shoes } =
    useContext(productsContext)

  const [searchVal, setSearchVal] = useState('')

  async function handleSearch(value) {
    setSearchVal(value)
    getProducts(`q=${value}`)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="shoes-edit-wrapper">
      <div className="shoes-edit-search">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="search product"
        />
      </div>
      <div className="shoes-container">
        {shoes.map((item) => {
          return (
            <div key={item.id}>
              <div className="button-wrapper">
                <button onClick={() => handleEditProduct(item.id)}>
                  <img
                    src={EditIcon}
                    alt="edit icon"
                    style={{ width: '20px' }}
                  />
                </button>
                <button onClick={() => handleDeleteProduct(item.id, searchVal)}>
                  <img
                    src={DeleteIcon}
                    alt="delete icon"
                    style={{ width: '20px' }}
                  />
                </button>
              </div>
              <p>{item.title}</p>
              <p>{item.category}</p>
              <img
                src={item.images[0].images}
                alt={item.title}
                style={{ width: '300px' }}
              />
              <p>{item.price} Тенге</p>
            </div>
          )
        })}
      </div>
      {isEdit && <EditModal searchVal={searchVal} />}
    </div>
  )
}

export default EditProduct
