import React from "react";
import { Box, Container } from "@mui/material";

import styles from "./Footer.module.scss";

type footerProps = {
  variant: string;
};

const Footer = ({ variant }: footerProps) => {
  return variant === "home" ? (
    <footer>
      <Box className={`${styles["footer-home"]}`}>
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
    <footer>
      <Box className={`${styles["footer-detail"]}`}>
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
