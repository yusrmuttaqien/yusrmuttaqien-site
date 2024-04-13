import classMerge from '@/utils/class-merge';
import type { MasteriesListProps } from '@/types/home';

const styles = {
  firstParagraph: '',
  nextParagraphs: 'text-grey/60 dark:text-beige/60 text-justify',
};

export default function HomeMasteriesList({ title, contents, idx }: MasteriesListProps) {
  return (
    <article
      data-framer={`masteries-list-${idx}`}
      className={classMerge(
        'flex flex-col gap-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'lg:w-[clamp(37.375rem,_28.0252rem_+_17.9372vw,_42.375rem)] lg:ml-auto',
        'lg:flex-row lg:gap-0 lg:justify-between'
      )}
    >
      <h3 data-framer={`masteries-list-title-${idx}`} className="uppercase">
        {title}
      </h3>
      <div
        data-framer={`masteries-list-contents-${idx}`}
        className="space-y-[.5lh] lg:w-[clamp(24.4375rem,_25.1387rem_+_-1.3453vw,_24.0625rem)] shrink-0"
      >
        {contents.map((content, innerIdx) => (
          <p
            data-framer={`masteries-list-content-${idx}-${innerIdx}`}
            key={`${content}-${idx}-${innerIdx}`}
            className={innerIdx === 0 ? styles.firstParagraph : styles.nextParagraphs}
          >
            {content}
          </p>
        ))}
      </div>
    </article>
  );
}