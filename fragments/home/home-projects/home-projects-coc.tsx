import { tv } from 'tailwind-variants';
import type { ProjectsCOCProps } from '@/types/home';

export const styles = tv({
  slots: {
    container: '',
    svg: '',
    stroke: '',
    path: '',
  },
});

export default function HomeProjectsCOC({ className }: ProjectsCOCProps) {
  const { container, stroke, path, svg } = styles();

  return (
    <div className={container({ className: className?.container })}>
      <div data-framer="projects-header-coc">
        <svg
          className={svg({ className: className?.svg })}
          viewBox="0 0 221 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M166.289 45.7306L184.109 11.2125H185.937L203.757 45.7306H196.355L185.023 23.1469L173.691 45.7306H166.289Z"
            className={path({ className: className?.path })}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M149.912 55.7304L178.058 1.2124H184.881L185.023 0.930298L185.165 1.2124L191.988 1.2124L220.134 55.7304H190.225L185.023 45.3633L179.821 55.7304H149.912ZM185.937 11.2124H184.109L166.289 45.7304H173.691L185.023 23.1468L196.355 45.7304H203.757L185.937 11.2124Z"
            className={stroke({ className: className?.stroke })}
          />
          <path
            d="M134.423 71.4349L105.271 40.4972H85.1655V33.9791H107.738L136.89 64.9168H156.995V71.4349H134.423ZM134.423 40.4972V33.9791H156.995V40.4972H134.423Z"
            className={path({ className: className?.path })}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M130.139 81.4349L100.986 50.4972H75.2109V23.9791H112.022L124.468 37.1874V23.9791H166.95V50.4972H137.01L141.175 54.9168H166.95V81.4349H130.139ZM85.1656 33.9791V40.4972H105.271L134.423 71.4349H156.995V64.9168H136.89L107.738 33.9791H85.1656ZM134.423 40.4972V33.9791H156.995V40.4972H134.423Z"
            className={stroke({ className: className?.stroke })}
          />
          <path
            d="M24.7175 83.2777C16.2186 83.2777 10.7354 77.8613 10.7354 69.4154C10.7354 60.5105 16.0358 55.2777 26.4539 55.2777H31.8457V45.1793H26.4539C16.0358 45.1793 10.7354 39.9465 10.7354 31.0416C10.7354 22.5957 16.2186 17.1793 24.7175 17.1793C34.9528 17.1793 38.2427 23.6055 38.2427 31.317V38.9367H48.2953V31.317C48.2953 23.6055 51.5852 17.1793 61.8205 17.1793C70.3195 17.1793 75.8027 22.5957 75.8027 31.0416C75.8027 39.9465 70.5022 45.1793 60.0841 45.1793H54.6923V55.2777H60.0841C70.5022 55.2777 75.8027 60.5105 75.8027 69.4154C75.8027 77.8613 70.3195 83.2777 61.8205 83.2777C51.5852 83.2777 48.2953 76.8515 48.2953 69.14V61.5203H38.2427V69.14C38.2427 76.8515 34.9528 83.2777 24.7175 83.2777ZM54.6923 31.1334V38.9367H60.0841C66.5726 38.9367 69.3142 36.2744 69.3142 31.0416C69.3142 25.6252 66.1157 23.5137 61.8205 23.5137C57.0684 23.5137 54.6923 26.4515 54.6923 31.1334ZM26.4539 38.9367H31.8457V31.1334C31.8457 26.4515 29.4696 23.5137 24.7175 23.5137C20.4223 23.5137 17.2238 25.6252 17.2238 31.0416C17.2238 36.2744 19.9654 38.9367 26.4539 38.9367ZM38.2427 55.2777H48.2953V45.1793H38.2427V55.2777ZM24.7175 76.9433C29.4696 76.9433 31.8457 74.0055 31.8457 69.3236V61.5203H26.4539C19.9654 61.5203 17.2238 64.1826 17.2238 69.4154C17.2238 74.8318 20.4223 76.9433 24.7175 76.9433ZM54.6923 69.3236C54.6923 74.0055 57.0684 76.9433 61.8205 76.9433C66.1157 76.9433 69.3142 74.8318 69.3142 69.4154C69.3142 64.1826 66.5726 61.5203 60.0841 61.5203H54.6923V69.3236Z"
            className={path({ className: className?.path })}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.2953 45.1793H38.2428V55.2777H48.2953V45.1793ZM31.8457 61.5203H26.4539C24.6508 61.5203 23.1371 61.7259 21.8911 62.1351C18.6534 63.1985 17.2238 65.6368 17.2238 69.4154C17.2238 74.8318 20.4224 76.9433 24.7175 76.9433C28.675 76.9433 30.9847 74.9058 31.6464 71.5203C31.7793 70.8406 31.8457 70.1064 31.8457 69.3236V61.5203ZM21.876 69.6203C21.876 69.6203 21.8767 69.6121 21.8794 69.597C21.8776 69.613 21.876 69.6203 21.876 69.6203ZM54.6924 61.5203V69.3236C54.6924 70.1064 54.7588 70.8406 54.8917 71.5203C55.5534 74.9058 57.863 76.9433 61.8205 76.9433C66.1157 76.9433 69.3142 74.8318 69.3142 69.4154C69.3142 65.6368 67.8847 63.1985 64.647 62.1351C63.401 61.7259 61.8873 61.5203 60.0842 61.5203H54.6924ZM64.6621 69.6203C64.6621 69.6203 64.6605 69.613 64.6586 69.5969C64.6614 69.6121 64.6621 69.6203 64.6621 69.6203ZM54.6924 38.9367H60.0842C61.8873 38.9367 63.401 38.7311 64.647 38.3219C67.8847 37.2585 69.3142 34.8203 69.3142 31.0416C69.3142 25.6252 66.1157 23.5137 61.8205 23.5137C57.863 23.5137 55.5534 25.5512 54.8917 28.9367C54.7588 29.6165 54.6924 30.3506 54.6924 31.1334V38.9367ZM64.6621 30.8367C64.6621 30.8367 64.6614 30.8449 64.6586 30.86C64.6605 30.844 64.6621 30.8367 64.6621 30.8367ZM31.8457 38.9367V31.1334C31.8457 30.3506 31.7793 29.6165 31.6464 28.9367C30.9847 25.5512 28.675 23.5137 24.7175 23.5137C20.4224 23.5137 17.2238 25.6252 17.2238 31.0416C17.2238 34.8203 18.6534 37.2585 21.8911 38.3219C23.1371 38.7311 24.6508 38.9367 26.4539 38.9367H31.8457ZM21.876 30.8367C21.876 30.8367 21.8776 30.844 21.8794 30.86C21.8767 30.8449 21.876 30.8367 21.876 30.8367ZM7.55047 86.6348C2.92103 82.0497 0.780762 75.8619 0.780762 69.4154C0.780762 62.9446 2.76407 56.4253 7.95839 51.6383C8.50535 51.1342 9.07126 50.6648 9.65417 50.2285C9.07126 49.7922 8.50535 49.3228 7.95839 48.8187C2.76407 44.0317 0.780762 37.5124 0.780762 31.0416C0.780762 24.5951 2.92103 18.4073 7.55047 13.8222C12.165 9.25198 18.3368 7.17932 24.7175 7.17932C32.0261 7.17932 38.5688 9.57693 43.0106 15.009C43.0981 15.116 43.1843 15.2236 43.269 15.3316C43.3538 15.2236 43.4399 15.116 43.5275 15.009C47.9693 9.57693 54.512 7.17932 61.8205 7.17932C68.2012 7.17932 74.3731 9.25198 78.9876 13.8222C83.617 18.4073 85.7573 24.5951 85.7573 31.0416C85.7573 37.5124 83.774 44.0317 78.5797 48.8187C78.0327 49.3228 77.4668 49.7922 76.8839 50.2285C77.4668 50.6648 78.0327 51.1342 78.5797 51.6383C83.774 56.4253 85.7573 62.9446 85.7573 69.4154C85.7573 75.8619 83.617 82.0497 78.9876 86.6348C74.3731 91.205 68.2012 93.2777 61.8205 93.2777C54.512 93.2777 47.9693 90.8801 43.5275 85.448C43.4399 85.341 43.3538 85.2334 43.269 85.1254C43.1843 85.2334 43.0981 85.341 43.0106 85.448C38.5688 90.8801 32.0261 93.2777 24.7175 93.2777C18.3368 93.2777 12.165 91.205 7.55047 86.6348ZM10.7354 69.4154C10.7354 77.8613 16.2186 83.2777 24.7175 83.2777C34.8715 83.2777 38.19 76.9532 38.2421 69.3236C38.2426 69.2625 38.2428 69.2013 38.2428 69.14V61.5203H48.2953V69.14C48.2953 69.2013 48.2955 69.2625 48.2959 69.3236C48.348 76.9532 51.6666 83.2777 61.8205 83.2777C70.3195 83.2777 75.8027 77.8613 75.8027 69.4154C75.8027 60.5105 70.5023 55.2777 60.0842 55.2777H54.6924V45.1793H60.0842C70.5023 45.1793 75.8027 39.9465 75.8027 31.0416C75.8027 22.5957 70.3195 17.1793 61.8205 17.1793C51.6666 17.1793 48.348 23.5038 48.2959 31.1334C48.2955 31.1945 48.2953 31.2557 48.2953 31.317V38.9367H38.2428V31.317C38.2428 31.2557 38.2426 31.1945 38.2421 31.1334C38.19 23.5038 34.8715 17.1793 24.7175 17.1793C16.2186 17.1793 10.7354 22.5957 10.7354 31.0416C10.7354 39.9465 16.0358 45.1793 26.4539 45.1793H31.8457V55.2777H26.4539C16.0358 55.2777 10.7354 60.5105 10.7354 69.4154Z"
            className={stroke({ className: className?.stroke })}
          />
        </svg>
      </div>
    </div>
  );
}