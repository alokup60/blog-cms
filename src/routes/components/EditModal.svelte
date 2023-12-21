<script>
  //   let modal = true;
</script>

<section class="modal hidden">
  <h2>Edit Tag</h2>
  <div class="flex justify-between mx-auto items-center">
    <label for="tag">Tag</label>
    <input type="text" value="" name="tag" />
  </div>
  <div class="flex justify-center items-center gap-4 mx-auto">
    <button
      type="button"
      class="bg-green-400 text-white rounded-md px-2 py-1 hover:bg-green-500 transition-all delay-200"
      >Update</button
    >
    <button
      type="button"
      class="bg-red-400 text-white rounded-md px-2 py-1 hover:bg-red-500 transition-all delay-200"
      >Close</button
    >
  </div>
</section>

<div class="overlay hidden"></div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1;
  }
  .modal {
    z-index: 2;
  }
</style>
