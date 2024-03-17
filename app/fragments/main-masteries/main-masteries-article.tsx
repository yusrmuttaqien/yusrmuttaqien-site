import classMerge from '@/app/utils/class-merge';
import type { MainMasteriesArticleProps } from '@/app/types/main-masteries-article';

const styles = {
  firstParagraph: 'body-normal',
  nextParagraphs: 'text-grey/60 dark:text-beige/60 body-normal text-justify',
};

export default function MainMasteriesArticle({ title, contents }: MainMasteriesArticleProps) {
  return (
    <article
      className={classMerge(
        'flex flex-col gap-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'lg:w-[clamp(37.375rem,_28.0252rem_+_17.9372vw,_42.375rem)] lg:ml-auto',
        'lg:flex-row lg:gap-0 lg:justify-between'
      )}
    >
      <h3 className="body-normal uppercase ">{title}</h3>
      <div className="space-y-[1lh] lg:w-[clamp(24.4375rem,_25.1387rem_+_-1.3453vw,_24.0625rem)] shrink-0">
        {contents.map((content, idx) => (
          <p key={content} className={idx === 0 ? styles.firstParagraph : styles.nextParagraphs}>
            {content}
          </p>
        ))}
      </div>
    </article>
  );
}
