<script>
    import { updateDish, getDish } from "../../../services/dishService";
    import { getRole, fetchUserRole } from "../../../services/authService";
    onMount(async () => {
        try {
            let role = getRole(); // Obtener el rol actual
            console.log("Role in Component (initial):", role);

            if (!role) {
                role = await fetchUserRole(); // Obtener el rol si es null
                console.log("Role in Component (fetched):", role);
            }
            if (role !== "administrador") {
                window.location.href = "/";
            }
        } catch (err) {
            console.error("Error protecting route:", err);
            window.location.href = "/";
        }
    });
    import { onMount } from "svelte";

    export let id;
    let dish = { name: "", description: "", price: 0, quantity: 1 };

    onMount(async () => {
        dish = await getDish(id);
    });

    async function handleSubmit() {
        await updateDish(id, dish);
        window.location.href = "/administrador/platos";
    }
</script>

<h1>Actualizar Plato</h1>

<form on:submit|preventDefault={handleSubmit}>
    <div class="mb-5">
        <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nombre:
        </label>
        <input
            type="text"
            id="name"
            bind:value={dish.name}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
        />
    </div>
    <div class="mb-5">
        <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Descripción:</label
        >
        <textarea
            id="description"
            bind:value={dish.description}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
    </div>
    <div class="mb-5">
        <label
            for="precio"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Precio</label
        >
        <input
            type="number"
            id="price"
            bind:value={dish.price}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
        />
    </div>

    <div class="mb-5">
        <label
            for="cantidad"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Cantidad</label
        >
        <input
            type="number"
            id="quantity"
            bind:value={dish.quantity}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
        />
    </div>

    <button
        type="submit"
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        ><span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
        >
            Actualizar
        </span>
    </button>
</form>
