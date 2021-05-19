import React, { useEffect, useState } from 'react';
import Alert from '../../components/alert';
import Card from '../../components/card';
import { CardContainer } from '../../components/card/CardStyles';
import PageTitle from '../../components/PageTitle';
import { getAllDocs } from '../../utils/admin/adminapicall';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const preload = async () => {
    try {
      setStatus('Products Loading');
      setMessage('Please wait...');
      setShowAlert(true);
      const response = await getAllDocs({ query: '/products?fields=-photo' });
      if (response.status !== 'success') throw new Error(response.message);
      setProducts(response.data.documents);
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

  return (
    <main>
      {showAlert && (
        <Alert
          status={status}
          message={message}
          handleAlert={() => setShowAlert(false)}
        />
      )}
      <PageTitle title="Home" description="Welcome to the T-shirt store" />
      <CardContainer>
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </CardContainer>
    </main>
  );
};

export default Home;
