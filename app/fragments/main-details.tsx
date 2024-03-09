import classMerge from '@/app/utils/class-merge';

export default function MainDetails({ className }: { className?: string }) {
  return (
    <section className={classMerge('h-[100dvh] flex justify-center items-center', className)}>
      <div className="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis debitis error, eum numquam
        quia recusandae delectus magnam non ducimus? Aspernatur cumque omnis tempore corrupti vel
        vero optio eius sint ullam aut, ab nisi distinctio, sequi dicta, assumenda delectus tenetur
        in. Nemo impedit asperiores dignissimos praesentium recusandae ab id consectetur expedita!
        Suscipit rem error reiciendis repellendus, assumenda a incidunt ab? Obcaecati facere
        quisquam reprehenderit accusamus commodi, error, eius nesciunt dolores sed velit cum, nisi
        provident unde? Culpa illum esse reiciendis, assumenda sapiente magnam corrupti, soluta quae
        animi necessitatibus aliquid ullam libero nemo sint nostrum id debitis, odio excepturi
        pariatur mollitia. Libero repellendus quaerat eius facilis perspiciatis ab quam, laudantium
        debitis ex rem molestiae excepturi neque beatae in dolores et, autem delectus.
      </div>
    </section>
  );
}
