<script>
  export let post;

  const formData = {
    title_seo: "",
    desc_seo: "",
    author_seo: "",
    location_seo: "",
    keywords_seo: "",
  };
  if (post) {
    post.map((item) => {
      formData.title_seo = item.seo_title || "";
      formData.desc_seo = item.desc_seo || "";
      formData.author_seo = item.author_seo || "";
      formData.location_seo = item.location_seo || "";
      formData.keywords_seo = item.keywords_seo || "";
    });
  }
</script>

<section class="container mx-auto w-full mt-[4rem]">
  <div class="flex items-center justify-between mx-auto flex-wrap gap-2">
    <label for="title_seo">SEO Title </label>
    <input
      type="text"
      name="title_seo"
      placeholder="Enter SEO title here"
      bind:value={formData.title_seo}
      class="border outline-none p-2 rounded-md w-10/12"
      required
    />
  </div>
  <div class="flex items-center justify-between mx-auto">
    <label for="desc_seo">SEO Description</label>
    <input
      type="text"
      name="desc_seo"
      placeholder="Enter SEO Description here"
      bind:value={formData.desc_seo}
      class="border outline-none p-2 rounded-md w-10/12"
      required
    />
  </div>
  <div class="flex items-center justify-between mx-auto flex-wrap">
    <label for="author_seo">SEO Author</label>
    <input
      type="text"
      name="author_seo"
      placeholder="Enter SEO Author name here"
      bind:value={formData.author_seo}
      class="border outline-none p-2 rounded-md w-10/12"
    />
  </div>
  <div class="flex items-center justify-between mx-auto flex-wrap">
    <label for="location_seo">SEO Location</label>
    <input
      type="text"
      name="location_seo"
      placeholder="Enter SEO Location here"
      bind:value={formData.location_seo}
      class="border outline-none p-2 rounded-md w-10/12"
    />
  </div>
  <div class="flex items-center justify-between mx-auto flex-wrap">
    <label for="keywords_seo">SEO Keywords</label>
    <input
      type="text"
      name="keywords_seo"
      placeholder="Enter SEO Location here"
      bind:value={formData.keywords_seo}
      class="border outline-none p-2 rounded-md w-10/12"
      required
    />
  </div>
</section>
