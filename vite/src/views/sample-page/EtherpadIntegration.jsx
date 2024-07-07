import React, { useEffect, useState } from 'react';
import { createPad, getPadText } from 'etherpadService';
const EtherpadIntegration = () => {
  const [padId] = useState('test-pad'); // You can generate or fetch this dynamically
  const [padText, setPadText] = useState('');

  useEffect(() => {
    const fetchPadText = async () => {
      await createPad(padId); // Create pad if it doesn't exist
      const text = await getPadText(padId);
      setPadText(text);
    };

    fetchPadText();
  }, [padId]);

  return (
    <div>
      <h1>Etherpad</h1>
      <p>{padText}</p>
      <iframe
        src={`http://localhost:9001/p/${padId}`}
        width="100%"
        height="500px"
        title="Etherpad"
      ></iframe>
    </div>
  );
};

export default EtherpadIntegration;
