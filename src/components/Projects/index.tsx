import classMerge from '@/utils/classMerge';

export default function Projects() {
  return (
    <section className="h-[300dvh] ">
      <h2
        className={classMerge(
          'trim-nohemi-height text-center text-clamp-[48_84_320_540] font-nohemi',
          'sticky top-[50dvh] pt-1'
        )}
      >
        The <span className="text-dynamic-green block font-extrabold">projects</span>
      </h2>
    </section>
  );
}
