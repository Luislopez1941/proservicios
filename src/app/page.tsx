import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Main from "@/components/sections/home/Main";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  return (
    <div className={styles.page}>
   
   
        <Main />
       
 
    </div>
  );
}
