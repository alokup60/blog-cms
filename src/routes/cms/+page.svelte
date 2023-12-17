<script>
  const formData = {
    title: "",
  };
</script>

<div>
  <form>
    <div>
      <label for="title">Title</label>
      <input
        type="text"
        bind:value={formData.title}
        placeholder="Enter title"
      />
    </div>
  </form>
</div>
