"use client";

import React, { useEffect } from "react";

const ZK = () => {
  useEffect(() => {
    const checkForTokenAndRedirect = () => {
      const hash = window.location.hash;

      const match = hash.match(/id_token=([^&]+)/);
      if (match && match[1]) {
        const idToken = match[1];
        localStorage.setItem("id_token", idToken);

        const newUrl = `${window.location.origin}/create-new-gig${hash}`;
        window.location.replace(newUrl);
      }
    };

    checkForTokenAndRedirect();
  }, []);

  return <div>ZK</div>;
};

export default ZK;
