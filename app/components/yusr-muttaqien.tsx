'use client';

import { motion } from 'framer-motion';
import useMediaQuery from '@/app/hooks/media-query';
import { useAnimationSequence } from '@/app/providers/animation-sequence';
import { LAYOUT_YUSR_MUTTAQIEN } from '@/app/constants/framer-motion';
import { scrSize } from '@/app/constants/tailwind-config';
import { renderOnEnum } from '@/app/constants/yusr-muttaqien';
import type { YusrMuttaqienProps } from '@/app/types/yusr-muttaqien';

const fillStyles = 'fill-grey dark:fill-beige';

export default function YusrMuttaqien({ renderOn }: YusrMuttaqienProps) {
  const { state } = useAnimationSequence();
  const [isTablet] = useMediaQuery(`screen and (min-width: ${scrSize('md', true)})`);

  switch (renderOn) {
    case renderOnEnum.SEQUENCE_START:
      if (!state.isSplashScreen) return null;
      break;
    case renderOnEnum.SEQUENCE_END:
      if (state.isSplashScreen) return null;
      break;
    default:
      break;
  }

  return isTablet ? (
    <motion.div className="w-full" layoutId={LAYOUT_YUSR_MUTTAQIEN + '-long'}>
      <svg width="100%" viewBox="0 0 785 101" fill="none">
        <path
          d="M747.378 79H726.245V20.2372H747.378V38.5722C749.475 25.2829 755.977 18.6382 766.886 18.6382C769.871 18.6382 772.465 19.1445 774.668 20.1572C776.889 21.1699 778.719 22.7067 780.158 24.7676C781.615 26.8286 782.698 29.4225 783.409 32.5494C784.137 35.6763 784.502 39.354 784.502 43.5824V79H763.368V48.9123C763.368 44.7727 762.729 41.6991 761.45 39.6915C760.188 37.6839 758.243 36.6801 755.613 36.6801C752.895 36.6801 750.843 37.7105 749.457 39.7715C748.071 41.8324 747.378 44.9504 747.378 49.1255V79Z"
          className={fillStyles}
        />
        <path
          d="M721.976 58.6662C721.124 62.0596 719.8 65.1154 718.006 67.8337C716.229 70.5342 714.07 72.835 711.53 74.736C708.989 76.6192 706.111 78.0672 702.895 79.0799C699.679 80.0926 696.224 80.5989 692.528 80.5989C689.508 80.5989 686.657 80.2614 683.974 79.5863C681.291 78.9111 678.821 77.9428 676.565 76.6814C674.309 75.4022 672.283 73.8477 670.489 72.0177C668.695 70.1878 667.167 68.1268 665.905 65.835C664.662 63.5431 663.702 61.038 663.027 58.3197C662.37 55.5837 662.041 52.6788 662.041 49.6052C662.041 46.5316 662.37 43.6357 663.027 40.9174C663.684 38.1814 664.626 35.6674 665.852 33.3755C667.096 31.0836 668.606 29.0316 670.382 27.2194C672.159 25.3895 674.167 23.8438 676.405 22.5824C678.644 21.3032 681.087 20.326 683.734 19.6509C686.399 18.9757 689.233 18.6382 692.235 18.6382C696.712 18.6382 700.79 19.3844 704.467 20.8768C708.163 22.3514 711.316 24.4478 713.928 27.1661C716.558 29.8844 718.592 33.1446 720.031 36.9466C721.488 40.7486 722.216 44.9682 722.216 49.6052C722.216 50.3514 722.198 51.1065 722.163 51.8705C722.127 52.6344 722.065 53.3717 721.976 54.0824H681.868C682.277 57.5291 683.441 60.1852 685.36 62.0507C687.296 63.8984 689.89 64.8223 693.141 64.8223C695.486 64.8223 697.45 64.3159 699.031 63.3032C700.612 62.2728 701.856 60.7271 702.762 58.6662H721.976ZM702.709 43.689C702.122 40.4022 700.976 37.9682 699.271 36.3869C697.565 34.788 695.264 33.9885 692.368 33.9885C689.401 33.9885 687.047 34.8057 685.306 36.4402C683.583 38.0748 682.481 40.491 682.002 43.689H702.709Z"
          className={fillStyles}
        />
        <path
          d="M658.114 14.7208H636.874V0.116699H658.114V14.7208ZM658.061 79.0001H636.927V20.2373H658.061V79.0001Z"
          className={fillStyles}
        />
        <path
          d="M631.836 20.2372V99.1738H610.703V61.4644C609.619 67.7715 607.585 72.5418 604.6 75.7753C601.615 78.9911 597.724 80.5989 592.927 80.5989C589.569 80.5989 586.505 79.8527 583.733 78.3604C580.961 76.8502 578.581 74.736 576.591 72.0177C574.601 69.2817 573.055 66.0126 571.954 62.2106C570.87 58.4086 570.328 54.2068 570.328 49.6052C570.328 45.0037 570.87 40.8019 571.954 36.9999C573.055 33.1979 574.601 29.9377 576.591 27.2194C578.581 24.5011 580.961 22.3958 583.733 20.9034C586.505 19.3933 589.569 18.6382 592.927 18.6382C597.724 18.6382 601.615 20.2461 604.6 23.4618C607.585 26.6775 609.619 31.439 610.703 37.7461V20.2372H631.836ZM610.703 49.6052C610.703 45.288 609.903 42.0456 608.304 39.8781C606.705 37.7105 604.315 36.6268 601.135 36.6268C597.973 36.6268 595.601 37.7017 594.02 39.8514C592.456 42.0012 591.675 45.2524 591.675 49.6052C591.675 58.2753 594.828 62.6103 601.135 62.6103C604.315 62.6103 606.705 61.5266 608.304 59.3591C609.903 57.1915 610.703 53.9403 610.703 49.6052Z"
          className={fillStyles}
        />
        <path
          d="M507.663 42.8362C507.663 39.0875 508.347 35.7207 509.715 32.7359C511.083 29.7511 513.046 27.2194 515.605 25.1407C518.181 23.0443 521.299 21.4364 524.959 20.3171C528.636 19.1978 532.776 18.6382 537.377 18.6382C542.014 18.6382 546.136 19.2067 549.743 20.3438C553.367 21.4808 556.423 23.142 558.91 25.3273C561.416 27.4948 563.317 30.1598 564.613 33.3222C565.928 36.4847 566.586 40.0913 566.586 44.142V79H545.452V64.7157C544.848 67.1674 543.916 69.3705 542.654 71.3248C541.393 73.2791 539.865 74.9492 538.07 76.335C536.276 77.703 534.233 78.7512 531.941 79.4797C529.667 80.2258 527.206 80.5989 524.559 80.5989C521.77 80.5989 519.229 80.1903 516.937 79.3731C514.645 78.5558 512.682 77.4098 511.047 75.9352C509.413 74.4428 508.151 72.6573 507.263 70.5786C506.375 68.4822 505.931 66.1548 505.931 63.5964C505.931 60.7182 506.508 58.1598 507.663 55.9212C508.818 53.6827 510.497 51.7905 512.7 50.2448C514.921 48.6991 517.639 47.5266 520.855 46.7271C524.07 45.9098 527.73 45.5012 531.834 45.5012H545.452V44.142C545.452 40.873 544.733 38.3679 543.294 36.6268C541.855 34.8857 539.705 34.0151 536.844 34.0151C534.037 34.0151 531.976 34.788 530.662 36.3336C529.347 37.8616 528.69 40.0291 528.69 42.8362H507.663ZM535.219 55.8413C532.572 55.8413 530.573 56.2766 529.223 57.1471C527.872 58.0177 527.197 59.3058 527.197 61.0113C527.197 62.6636 527.81 63.9517 529.036 64.8756C530.28 65.7817 532.012 66.2347 534.233 66.2347C535.796 66.2347 537.253 66.0126 538.603 65.5685C539.971 65.1243 541.162 64.5202 542.174 63.7563C543.187 62.9746 543.987 62.0685 544.573 61.038C545.159 59.9898 545.452 58.8794 545.452 57.7068V55.8413H535.219Z"
          className={fillStyles}
        />
        <path
          d="M503.55 78.547C500.832 79.2222 498.3 79.7285 495.955 80.0661C493.61 80.4214 491.415 80.5991 489.372 80.5991C475.177 80.5991 468.079 72.5242 468.079 56.3744V36.547H461.363V20.2373H468.079V6.69922H489.212V20.2373H503.55V36.547H489.212V56.4277C489.212 57.849 489.337 59.0749 489.585 60.1054C489.834 61.1181 490.216 61.9531 490.731 62.6105C491.264 63.2501 491.939 63.7298 492.757 64.0496C493.592 64.3516 494.587 64.5026 495.742 64.5026C496.683 64.5026 497.776 64.4049 499.019 64.2095C500.281 63.9963 501.791 63.6765 503.55 63.2501V78.547Z"
          className={fillStyles}
        />
        <path
          d="M459.307 78.547C456.589 79.2222 454.057 79.7285 451.712 80.0661C449.367 80.4214 447.173 80.5991 445.13 80.5991C430.934 80.5991 423.836 72.5242 423.836 56.3744V36.547H417.121V20.2373H423.836V6.69922H444.97V20.2373H459.307V36.547H444.97V56.4277C444.97 57.849 445.094 59.0749 445.343 60.1054C445.591 61.1181 445.973 61.9531 446.489 62.6105C447.022 63.2501 447.697 63.7298 448.514 64.0496C449.349 64.3516 450.344 64.5026 451.499 64.5026C452.44 64.5026 453.533 64.4049 454.777 64.2095C456.038 63.9963 457.548 63.6765 459.307 63.2501V78.547Z"
          className={fillStyles}
        />
        <path
          d="M393.025 20.2373H414.158V79.0001H393.025V60.665C390.928 73.9544 384.426 80.5991 373.517 80.5991C367.565 80.5991 363.141 78.5559 360.245 74.4696C357.349 70.3656 355.901 64.094 355.901 55.6549V20.2373H377.035V50.3249C377.035 54.4468 377.665 57.5204 378.927 59.5457C380.206 61.5534 382.16 62.5572 384.79 62.5572C387.508 62.5572 389.56 61.5267 390.946 59.4658C392.332 57.4049 393.025 54.2869 393.025 50.1117V20.2373Z"
          className={fillStyles}
        />
        <path
          d="M278.509 79H257.376V20.2372H278.509V38.4656C280.606 25.2473 286.984 18.6382 297.644 18.6382C300.327 18.6382 302.681 19.0646 304.706 19.9174C306.749 20.7524 308.473 22.0316 309.876 23.7549C311.297 25.4605 312.408 27.6192 313.207 30.2308C314.025 32.8248 314.549 35.8806 314.78 39.3984C316.698 25.5582 323.13 18.6382 334.074 18.6382C337.006 18.6382 339.555 19.1445 341.723 20.1572C343.89 21.1699 345.685 22.7067 347.106 24.7676C348.545 26.8286 349.611 29.4225 350.304 32.5494C351.014 35.6763 351.37 39.354 351.37 43.5824V79H330.237V48.9123C330.237 44.7727 329.624 41.6991 328.398 39.6915C327.19 37.6839 325.324 36.6801 322.801 36.6801C317.56 36.6801 314.94 40.8286 314.94 49.1255V79H293.806V48.9123C293.806 44.7727 293.193 41.6991 291.967 39.6915C290.759 37.6839 288.894 36.6801 286.371 36.6801C281.13 36.6801 278.509 40.8286 278.509 49.1255V79Z"
          className={fillStyles}
        />
        <path d="M252.006 79H232.658V59.0659H252.006V79Z" className={fillStyles} />
        <path
          d="M213.446 79.0001H192.313V20.2373H213.446V42.3033C213.819 38.9455 214.388 35.9074 215.152 33.1891C215.934 30.4708 216.982 28.1523 218.297 26.2335C219.611 24.3147 221.219 22.8401 223.12 21.8096C225.039 20.7614 227.322 20.2373 229.969 20.2373H234.313V39.9848H224.639C222.401 39.9848 220.553 40.2691 219.096 40.8376C217.657 41.3884 216.511 42.25 215.658 43.4226C214.823 44.5952 214.246 46.0965 213.926 47.9264C213.606 49.7386 213.446 51.9061 213.446 54.429V79.0001Z"
          className={fillStyles}
        />
        <path
          d="M157.711 18.6382C162.348 18.6382 166.487 19.1268 170.129 20.1039C173.789 21.0811 176.872 22.5024 179.377 24.3679C181.9 26.2156 183.827 28.472 185.16 31.1369C186.492 33.8019 187.159 36.8133 187.159 40.1712H166.185C166.185 37.7194 165.528 35.8539 164.213 34.5748C162.898 33.2956 160.944 32.656 158.35 32.656C157.266 32.656 156.28 32.7626 155.392 32.9758C154.504 33.189 153.74 33.491 153.1 33.8819C152.461 34.2727 151.963 34.7435 151.608 35.2943C151.27 35.8451 151.101 36.4491 151.101 37.1065C151.101 38.0303 151.35 38.7854 151.848 39.3717C152.345 39.958 153.047 40.4555 153.953 40.8641C154.877 41.255 155.987 41.5837 157.284 41.8501C158.581 42.1166 160.02 42.4009 161.601 42.7029L165.519 43.4225C167.047 43.689 168.673 44.0088 170.396 44.3819C172.119 44.7372 173.834 45.1991 175.539 45.7677C177.245 46.3362 178.879 47.0469 180.443 47.8997C182.006 48.7347 183.392 49.774 184.6 51.0177C185.808 52.2613 186.768 53.7448 187.478 55.4682C188.189 57.1738 188.544 59.1814 188.544 61.491C188.544 64.5114 187.896 67.2119 186.599 69.5926C185.302 71.9555 183.41 73.9543 180.923 75.5888C178.435 77.2233 175.379 78.467 171.755 79.3197C168.148 80.1725 164.027 80.5989 159.39 80.5989C154.486 80.5989 150.142 80.1104 146.358 79.1332C142.591 78.1738 139.42 76.7614 136.844 74.8959C134.268 73.0304 132.313 70.7385 130.981 68.0202C129.666 65.2842 129.009 62.1484 129.009 58.6129H149.982C149.982 61.1535 150.737 63.0812 152.247 64.3959C153.775 65.7106 156.085 66.368 159.176 66.368C160.456 66.368 161.61 66.2614 162.641 66.0482C163.671 65.8172 164.551 65.5063 165.279 65.1154C166.025 64.7068 166.594 64.2182 166.985 63.6497C167.393 63.0811 167.598 62.4416 167.598 61.7309C167.598 60.8248 167.376 60.0875 166.931 59.519C166.505 58.9504 165.839 58.4796 164.933 58.1065C164.027 57.7157 162.881 57.3781 161.495 57.0938C160.127 56.7918 158.51 56.472 156.645 56.1344L152.7 55.4415C151.315 55.1928 149.787 54.8997 148.117 54.5621C146.464 54.2068 144.803 53.7537 143.133 53.203C141.463 52.6344 139.846 51.9327 138.283 51.0976C136.719 50.2626 135.334 49.2233 134.126 47.9796C132.935 46.7182 131.976 45.2347 131.247 43.5291C130.519 41.8057 130.155 39.7892 130.155 37.4796C130.155 34.5303 130.777 31.892 132.02 29.5646C133.264 27.2194 135.067 25.2384 137.43 23.6217C139.793 22.0049 142.68 20.7702 146.091 19.9174C149.502 19.0646 153.376 18.6382 157.711 18.6382Z"
          className={fillStyles}
        />
        <path
          d="M104.353 20.2373H125.486V79.0001H104.353V60.665C102.256 73.9544 95.7536 80.5991 84.845 80.5991C78.8932 80.5991 74.4694 78.5559 71.5734 74.4696C68.6775 70.3656 67.2295 64.094 67.2295 55.6549V20.2373H88.3628V50.3249C88.3628 54.4468 88.9935 57.5204 90.2549 59.5457C91.5341 61.5534 93.4884 62.5572 96.1179 62.5572C98.8361 62.5572 100.888 61.5267 102.274 59.4658C103.66 57.4049 104.353 54.2869 104.353 50.1117V20.2373Z"
          className={fillStyles}
        />
        <path
          d="M65.161 20.2373L44.6673 78.6003C43.317 82.4557 41.718 85.778 39.8703 88.5674C38.0404 91.3567 35.9084 93.6575 33.4744 95.4697C31.0404 97.2818 28.2777 98.6232 25.1863 99.4938C22.1127 100.364 18.666 100.8 14.8462 100.8C11.2929 100.8 7.31316 100.4 2.90707 99.6004V83.2374C4.41722 83.4684 5.79413 83.6371 7.03778 83.7437C8.28144 83.8503 9.44515 83.9037 10.5289 83.9037C12.9807 83.9037 15.1038 83.6016 16.8982 82.9976C18.6926 82.4113 20.2738 81.4608 21.6419 80.146L0.988281 20.2373H23.3741L33.2345 63.4633L43.2548 20.2373H65.161Z"
          className={fillStyles}
        />
      </svg>
    </motion.div>
  ) : (
    <motion.div className="w-full" layoutId={LAYOUT_YUSR_MUTTAQIEN + '-short'}>
      <svg width="100%" viewBox="0 0 379 90" fill="none">
        <path
          d="M299.609 66.0003H276.799V2.5764H299.609V22.2507C301.872 7.98397 308.756 0.850586 320.261 0.850586C323.157 0.850586 325.698 1.3108 327.884 2.23124C330.089 3.1325 331.949 4.51316 333.464 6.3732C334.998 8.21408 336.196 10.5439 337.059 13.3628C337.941 16.1624 338.507 19.4607 338.756 23.2575C340.827 8.31955 347.769 0.850586 359.581 0.850586C362.745 0.850586 365.497 1.3971 367.836 2.49011C370.176 3.58313 372.112 5.24184 373.647 7.46622C375.2 9.69061 376.35 12.4903 377.098 15.8652C377.865 19.2401 378.249 23.2095 378.249 27.7734V66.0003H355.439V33.5261C355.439 29.0581 354.778 25.7407 353.454 23.5739C352.15 21.407 350.137 20.3236 347.414 20.3236C341.757 20.3236 338.929 24.8011 338.929 33.7562V66.0003H316.119V33.5261C316.119 29.0581 315.458 25.7407 314.135 23.5739C312.831 21.407 310.817 20.3236 308.094 20.3236C302.437 20.3236 299.609 24.8011 299.609 33.7562V66.0003Z"
          className={fillStyles}
        />
        <path d="M271.003 66.0001H250.121V44.4849H271.003V66.0001Z" className={fillStyles} />
        <path
          d="M229.385 66H206.576V2.57617H229.385V26.3925C229.788 22.7683 230.402 19.4892 231.226 16.5553C232.07 13.6214 233.201 11.119 234.62 9.04799C236.039 6.97701 237.775 5.38542 239.826 4.27323C241.897 3.14186 244.362 2.57617 247.219 2.57617H251.907V23.89H241.466C239.05 23.89 237.056 24.1969 235.483 24.8105C233.93 25.4049 232.693 26.335 231.773 27.6006C230.871 28.8662 230.248 30.4865 229.903 32.4616C229.558 34.4175 229.385 36.757 229.385 39.4799V66Z"
          className={fillStyles}
        />
        <path
          d="M169.229 0.850586C174.234 0.850586 178.702 1.37792 182.633 2.43259C186.583 3.48725 189.91 5.02131 192.614 7.03477C195.337 9.02905 197.417 11.4644 198.855 14.3407C200.294 17.2171 201.013 20.4674 201.013 24.0916H178.376C178.376 21.4454 177.666 19.4319 176.247 18.0512C174.828 16.6706 172.719 15.9803 169.919 15.9803C168.75 15.9803 167.685 16.0953 166.727 16.3254C165.768 16.5555 164.943 16.8815 164.253 17.3034C163.562 17.7253 163.026 18.2334 162.642 18.8279C162.278 19.4223 162.096 20.0743 162.096 20.7838C162.096 21.7809 162.364 22.5959 162.901 23.2287C163.438 23.8615 164.195 24.3984 165.173 24.8395C166.17 25.2613 167.369 25.6161 168.769 25.9037C170.169 26.1914 171.722 26.4982 173.428 26.8242L177.657 27.6008C179.306 27.8884 181.06 28.2336 182.92 28.6363C184.78 29.0198 186.631 29.5184 188.472 30.132C190.313 30.7456 192.077 31.5126 193.764 32.4331C195.452 33.3343 196.948 34.4561 198.251 35.7984C199.555 37.1407 200.591 38.7419 201.358 40.602C202.125 42.4428 202.508 44.6097 202.508 47.1025C202.508 50.3624 201.809 53.2771 200.409 55.8467C199.009 58.3971 196.967 60.5543 194.282 62.3185C191.597 64.0827 188.299 65.425 184.387 66.3454C180.495 67.2659 176.046 67.7261 171.041 67.7261C165.749 67.7261 161.06 67.1987 156.976 66.1441C152.91 65.1086 149.487 63.5841 146.707 61.5706C143.927 59.5572 141.817 57.0835 140.379 54.1496C138.96 51.1966 138.25 47.812 138.25 43.9961H160.887C160.887 46.7382 161.702 48.8188 163.332 50.2378C164.982 51.6568 167.474 52.3663 170.811 52.3663C172.192 52.3663 173.438 52.2512 174.55 52.0211C175.662 51.7718 176.612 51.4363 177.398 51.0144C178.203 50.5733 178.817 50.046 179.239 49.4324C179.68 48.8188 179.9 48.1284 179.9 47.3614C179.9 46.3834 179.661 45.5876 179.181 44.974C178.721 44.3604 178.002 43.8522 177.024 43.4495C176.046 43.0277 174.809 42.6633 173.313 42.3565C171.837 42.0305 170.092 41.6854 168.078 41.321L163.821 40.5732C162.326 40.3047 160.677 39.9883 158.874 39.624C157.091 39.2405 155.298 38.7515 153.495 38.157C151.693 37.5434 149.948 36.786 148.26 35.8847C146.573 34.9835 145.077 33.8617 143.773 32.5194C142.488 31.1579 141.453 29.5567 140.667 27.7158C139.88 25.8558 139.487 23.6793 139.487 21.1865C139.487 18.0033 140.158 15.1557 141.501 12.6437C142.843 10.1125 144.789 7.97438 147.34 6.22939C149.89 4.48439 153.006 3.15168 156.688 2.23124C160.37 1.3108 164.55 0.850586 169.229 0.850586Z"
          className={fillStyles}
        />
        <path
          d="M111.639 2.57617H134.448V66H111.639V46.2106C109.376 60.5541 102.358 67.7258 90.5836 67.7258C84.1597 67.7258 79.3849 65.5206 76.2593 61.1102C73.1336 56.6806 71.5708 49.9116 71.5708 40.8031V2.57617H94.3804V35.0503C94.3804 39.4991 95.0611 42.8165 96.4226 45.0026C97.8033 47.1694 99.9126 48.2529 102.751 48.2529C105.684 48.2529 107.899 47.1407 109.395 44.9163C110.891 42.6919 111.639 39.3265 111.639 34.8202V2.57617Z"
          className={fillStyles}
        />
        <path
          d="M69.3381 2.57617L47.2188 65.5686C45.7615 69.7297 44.0356 73.3156 42.0414 76.3262C40.0663 79.3368 37.7652 81.82 35.1381 83.776C32.511 85.7319 29.5292 87.1797 26.1926 88.1193C22.8752 89.0589 19.1551 89.5287 15.0323 89.5287C11.1971 89.5287 6.90177 89.0972 2.14618 88.2343V70.5734C3.77612 70.8227 5.26224 71.0049 6.60454 71.1199C7.94685 71.235 9.20286 71.2925 10.3726 71.2925C13.0188 71.2925 15.3103 70.9665 17.2471 70.3146C19.1838 69.6818 20.8905 68.6559 22.367 67.2369L0.0751953 2.57617H24.2367L34.8792 49.2308L45.6943 2.57617H69.3381Z"
          className={fillStyles}
        />
      </svg>
    </motion.div>
  );
}
