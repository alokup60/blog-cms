<!-- <script context="module">
  import { fetchData } from "../cms/+page.server";

  export async function load({ fetch }) {
    const response = await fetch(fetchData);
    const { success, data, error } = await response.json();

    if (success) {
      return {
        props: {
          data,
        },
      };
    } else {
      console.error("Error fetching data:", error);
      return {
        status: 500,
        error: new Error("Internal Server Error"),
      };
    }
  }
</script>

<script>
  export let data;
</script>

<main>
   Display the fetched data in your component -->
<!-- {#each data as item (item._id)}
    <div>{item.title}</div> -->
<!-- Add more fields based on your data structure -->
<!-- {/each}
</main> -->
