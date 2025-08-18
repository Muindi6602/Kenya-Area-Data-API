// src/fontawesome.ts
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faKey, faHome, faBook, faLink } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faKey, faHome, faBook, faLink); // Add more icons as needed
