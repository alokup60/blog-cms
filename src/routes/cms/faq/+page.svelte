<script>
  import Accordian from "../../components/Accordian.svelte";
</script>

<section class="flex flex-col mt-[4rem] ml-[5rem]">
  <Accordian>
    <span slot="head"
      >Question 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Fugiat, amet.
    </span>
    <div slot="details">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit id
        obcaecati ex nesciunt eum, accusamus ducimus doloremque officiis
        necessitatibus fuga.
      </p>
    </div>
  </Accordian>
</section>
