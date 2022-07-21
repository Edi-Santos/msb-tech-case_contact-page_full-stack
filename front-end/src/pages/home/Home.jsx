import React, { useEffect, useState } from 'react';

import Loading from '../loading/Loading';
import Form from '../../components/home/Form';

function Home() {
  const [isLoading, setIsLoadding] = useState(true);

  useEffect(() => {
    const milliseconds = 2000;

    setTimeout(() => {
      setIsLoadding(false);
    }, milliseconds);
  });

  return (
    <section>
      { isLoading && <Loading /> }
      { !isLoading && <Form /> }
    </section>
  );
}

export default Home;
