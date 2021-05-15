import React, { useEffect, useState } from 'react';
import DashboardMenu from '../../../components/DashboardMenu';
import productMenu from './productMenu';
import {
  Edit,
  NoHead,
  Table,
  TableComponent,
  TBody,
  THead,
  Price,
} from '../../../components/table/tableSyles';
import { isAuthenticated } from '../../../utils/auth';
import { deleteDoc, getAllDocs } from '../../../utils/admin/adminapicall';
import Alert from '../../../components/alert';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const preload = async () => {
    try {
      setStatus('Data Loading');
      setMessage('Please wait...');
      const data = await getAllDocs({
        query: '/products',
      });
      if (data.status !== 'success') throw new Error(data.message);
      setProducts(data.data.documents);

      setShowAlert(false);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteDoc({
        token: isAuthenticated().token,
        link: '/products',
        id,
      });
      console.log(response);
      if (response.status !== 'success') throw new Error(response.message);
      preload();
      setStatus(response.status);
      setMessage(response.message);
      setShowAlert(true);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  return (
    <main>
      {showAlert && (
        <Alert
          status={status}
          message={message}
          handleAlert={() => setShowAlert(false)}
        />
      )}
      <DashboardMenu title="Products" menu={productMenu} />
      <Table>
        <div>
          <TableComponent>
            <THead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Sold</th>
                <NoHead scope="col">
                  <span>Edit</span>
                </NoHead>
                <NoHead scope="col">
                  <span>Delete</span>
                </NoHead>
              </tr>
            </THead>
            <TBody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <Price>₹{product.price}</Price>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <Edit>
                    <button>Edit</button>
                  </Edit>
                  <Edit>
                    <button onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </Edit>
                </tr>
              ))}
            </TBody>
          </TableComponent>
        </div>
      </Table>
    </main>
  );
};

export default Products;
