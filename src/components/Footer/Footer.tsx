import React from "react";
import { Container } from "@mui/material";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${styles["main-footer"]}`}>
      <Container>
        <div className={`${styles["footer-inner"]}`}>
          <div className="flex items-center">
            <div>
              <p>© 2022 Airbnb, Inc.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
