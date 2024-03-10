import SectionHeader from '@/app/components/section-header';
import MainDetailsArticle from '@/app/fragments/main-details/main-details-article';
import classMerge from '@/app/utils/class-merge';

const DUMMY_ARTICLE_CONTENTS = {
  title: 'Frontend Developer',
  contents: [
    'Lorem ipsum dolor sit amet consectetur.',
    'Natoque a massa non massa urna feugiat sit purus. Habitant pulvinar ultricies eget pellentesque amet aliquam. Mauris ornare egestas penatibus id sed vitae in magna nulla. Faucibus tortor dui non sed imperdiet consectetur risus lorem scelerisque.',
    'Magna mattis tristique a elit mauris ultricies nisi eget sed. Sit sit facilisi eget habitant nunc nulla cras pellentesque nisl. Quisque sed ullamcorper arcu imperdiet. Id et sed tincidunt proin aliquet nec. Mattis duis urna amet mauris ut eu odio. Vitae urna pharetra feugiat.',
  ],
};

export default function MainDetails({ className }: { className?: string }) {
  return (
    <section
      className={classMerge('mt-[clamp(5.5625rem,_-0.0739rem_+_28.1818vw,_7.5rem)]', className)}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <SectionHeader
          subtitle="The Details"
          title="Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue."
        />
        <div className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]">
          <MainDetailsArticle {...DUMMY_ARTICLE_CONTENTS} />
          <MainDetailsArticle {...DUMMY_ARTICLE_CONTENTS} />
          <MainDetailsArticle {...DUMMY_ARTICLE_CONTENTS} />
        </div>
      </div>
    </section>
  );
}
