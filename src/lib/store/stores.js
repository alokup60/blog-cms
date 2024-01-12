import { writable } from "svelte/store";

// export let formData = writable({});
export let blogForm = writable([]);
export let allTags = writable({});
export let blogData = writable([]);

// console.log(formData, "store");
