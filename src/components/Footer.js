import React from 'react';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer  className="container w-auto">
    <div class="text-center">
        <small>© 2017 - {year} <a href="http://vacobinary.in/" traget="_blank">Vaco Binary Semantics</a> All Rights Reserved. </small>
    </div>
    </footer>
  );
};

export default Footer;