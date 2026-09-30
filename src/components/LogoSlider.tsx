import Image from "next/image";
import styles from "./LogoSlider.module.css";

const logos = [
  "ADB Invest.svg",
  "Apexco.svg",
  "Devnotech.svg",
  "Exen Consulting.svg",
  "Lemog.svg",
  "LNA V1.svg",
  "Mouvement populaire.svg",
  "Nador View.svg",
  "OgloNuts.svg",
  "Scientik.svg",
  "Scientra.svg",
  "Solistarp.svg",
  "Syntec services.svg",
];

export function LogoSlider() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {[...logos, ...logos, ...logos].map((file, i) => (
          <div className={styles.logo} key={`${file}-${i}`}>
            <Image
              src={`/clients/${file}`}
              alt={file.replace(/\.[^/.]+$/, "")}
              width={140}
              height={60}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
