import React, { useEffect, useState } from 'react';

import Loading from '../loading/Loading';

function Home() {
  const [isLoading, setIsLoadding] = useState(true);

  useEffect(() => {
    const milliseconds = 2000;

    setTimeout(() => {
      setIsLoadding(false);
    }, milliseconds);
  });

  return (
    <main>
      { isLoading && <Loading /> }
      { !isLoading && <h1>Home</h1> }
    </main>
  );
}

export default Home;
