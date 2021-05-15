import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardMenu from '../../../components/DashboardMenu';
import CategoryMenu from './categoryMenu';
import {
  Edit,
  NoHead,
  Table,
  TableComponent,
  TBody,
  THead,
  Delete,
} from '../../../components/table/tableSyles';
import { isAuthenticated } from '../../../utils/auth';
import { deleteDoc, getAllDocs } from '../../../utils/admin/adminapicall';
import Alert from '../../../components/alert';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const preload = async () => {
    try {
      setStatus('Data Loading');
      setMessage('Please wait...');
      const data = await getAllDocs({
        query: '/categories',
      });
      if (data.status !== 'success') throw new Error(data.message);
      setCategories(data.data.documents);
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
        link: '/categories',
        id,
      });

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
      <DashboardMenu title="Categories" menu={CategoryMenu} />
      <Table>
        <div>
          <TableComponent>
            <THead>
              <tr>
                <th scope="col">Category Name</th>

                <NoHead scope="col">
                  <span>Edit</span>
                </NoHead>
                <NoHead scope="col">
                  <span>Delete</span>
                </NoHead>
              </tr>
            </THead>
            <TBody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <Edit>
                    <Link to={`/update-category/${category.slug}`}>Edit</Link>
                  </Edit>
                  <Delete onClick={() => handleDelete(category._id)}>
                    Delete
                  </Delete>
                </tr>
              ))}
            </TBody>
          </TableComponent>
        </div>
      </Table>
    </main>
  );
};

export default Categories;
