import React from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import styles from "./Footer.module.scss";

type footerProps = {
  variant: string;
};

const Footer = ({ variant }: footerProps) => {
  return variant === "home" ? (
    <footer className={`${styles["footer"]}`}>
      <Box>
        <Container>
          <Box className={`${styles["footer-inner"]}`}>
            <Stack direction={"row"} alignItems="center" columnGap="19px" className={`${styles["copy-right"]}`}>
              <p>© 2022 Airbnb, Inc.</p>
              <Stack direction={"row"} columnGap="19px">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Sitemap</span>
                <span>Destinations</span>
              </Stack>
            </Stack>
            <Box className={`${styles["footer-social"]}`}>
              <ul>
                <li>
                  <FacebookIcon />
                </li>
                <li>
                  <TwitterIcon />
                </li>
                <li>
                  <InstagramIcon />
                </li>
              </ul>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  ) : variant === "detail" ? (
    <footer className={`${styles["footer"]} ${styles["--footer-detail"]}`}>
      <Box>
        <Container>
          <Box className={`${styles["footer-link"]}`}>
            <Box className={`${styles["link-block"]}`}>
              <h4 className="title --footer-title">Support</h4>
              <ul>
                <li>
                  <a href="#" target={"_blank"}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    AirCover
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Safety information
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Supporting people with disabilities
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Cancellation options
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Our COVID-19 Response
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Report a neighborhood concern
                  </a>
                </li>
              </ul>
            </Box>
            <Box className={`${styles["link-block"]}`}>
              <h4 className="title --footer-title">Community</h4>
              <ul>
                <li>
                  <a href="#" target={"_blank"}>
                    Airbnb.org: disaster relief housing
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Support Afghan refugees
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Combating discrimination
                  </a>
                </li>
              </ul>
            </Box>
            <Box className={`${styles["link-block"]}`}>
              <h4 className="title --footer-title">Hosting</h4>
              <ul>
                <li>
                  <a href="#" target={"_blank"}>
                    Try hosting
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    AirCover for Hosts
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Explore hosting resources
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Visit our community forum
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    How to host responsibly
                  </a>
                </li>
              </ul>
            </Box>
            <Box className={`${styles["link-block"]}`}>
              <h4 className="title --footer-title">Airbnb</h4>
              <ul>
                <li>
                  <a href="#" target={"_blank"}>
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Learn about new features
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Letter from our founders
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" target={"_blank"}>
                    Gift cards
                  </a>
                </li>
              </ul>
            </Box>
          </Box>
          <Box className={`${styles["footer-inner"]}`}>
            <Stack direction={"row"} alignItems="center" columnGap="19px" className={`${styles["copy-right"]}`}>
              <p>© 2022 Airbnb, Inc.</p>
              <Stack direction={"row"} columnGap="19px">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Sitemap</span>
              </Stack>
            </Stack>
            <Box className={`${styles["footer-social"]}`}>
              <ul>
                <li>
                  <FacebookIcon />
                </li>
                <li>
                  <TwitterIcon />
                </li>
                <li>
                  <InstagramIcon />
                </li>
              </ul>
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
