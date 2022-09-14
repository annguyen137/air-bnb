import React from "react";
import { Box, Container } from "@mui/material";

import styles from "./Footer.module.scss";

type footerProps = {
  variant: string;
};

const Footer = ({ variant }: footerProps) => {
  return variant === "home" ? (
    <footer className={`${styles["footer"]} ${styles["--footer-home"]}`}>
      <Box>
        <Container>
          <Box className={`${styles["footer-inner"]}`}>
            <Box>
              <p>© 2022 Airbnb, Inc.</p>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  ) : variant === "detail" ? (
    <footer className={`${styles["footer"]} ${styles["--footer-detail"]}`}>
      <Box>
        <Container>
          <Box className={`${styles["footer-inner"]}`}>
            <Box>
              <p>© 2022 Airbnb, Inc.</p>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  ) : (
    <footer></footer>
  );
};

export default Footer;
