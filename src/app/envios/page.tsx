"use client"
import React, { useState } from 'react'
import type {NextApiResponse } from 'next';

const PageEnvio =  () => {
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCotizacion = async () => {
    const url = "https://api.envia.com/ship/rate/";
    const pa = JSON.stringify({
      "origin": {
        "name": "USA",
        "company": "enviacommarcelo",
        "email": "juanpedrovazez@hotmail.com",
        "phone": "8182000536",
        "street": "351523",
        "number": "crescent ave",
        "district": "other",
        "city": "dallas",
        "state": "tx",
        "country": "US",
        "postalCode": "75205",
        "reference": "",
        "coordinates": {
          "latitude": "32.776272",
          "longitude": "-96.796856"
        }
      },
      "destination": {
        "name": "francisco",
        "company": "",
        "email": "",
        "phone": "8180180543",
        "street": "4th street",
        "number": "24",
        "district": "other",
        "city": "reno",
        "state": "nv",
        "country": "US",
        "postalCode": "89503",
        "reference": "",
        "coordinates": {
          "latitude": "39.512132",
          "longitude": "-119.906585"
        }
      },
      "packages": [
        {
          "content": "zapatos",
          "amount": 1,
          "type": "box",
          "weight": 1,
          "insurance": 0,
          "declaredValue": 0,
          "weightUnit": "LB",
          "lengthUnit": "IN",
          "dimensions": {
            "length": 11,
            "width": 15,
            "height": 20
          }
        }
      ],
      "shipment": {
        "carrier": "usps",
        "type": 1
      },
      "settings": {
        "currency": "USD"
      }
    });
    

    try {
      setError("Error al obtener la cotización");
      setResultado(null);
    } catch (error) {
      setError("Error al obtener la cotización");
      setResultado(null);
    }
  };

  return (
    <div>
      <h1>Page Envio</h1>
      <button onClick={handleCotizacion} className='p-4 bg-teal-700'>Cotizar Envio</button>
      {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default PageEnvio