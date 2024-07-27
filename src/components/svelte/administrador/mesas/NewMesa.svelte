<script>
    import { onMount } from "svelte";
    import { createMesa } from "../../../services/mesasService";
    import {
        createUser,
        getRole,
        fetchUserRole,
    } from "../../../services/authService";

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

    let mesa = { nombre: "", estado: "disponible", capacidad: "" };

    async function handleSubmit() {
        await createMesa(mesa);
        window.location.href = "/administrador/mesas";
    }
</script>

<h1 class="text-3xl uppercase font-semibold pb-10">Crear Mesa</h1>



<form on:submit|preventDefault={handleSubmit}>
    <div class="mb-5">
        <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Numero:
        </label>
        <input
            type="text"
            id="nombre"
            bind:value={mesa.nombre}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
        />
    </div>
    <div class="mb-5">
        <label
            for="capacidad"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Capacidad</label
        >
        <input
            type="number"
            id="capacidad"
            bind:value={mesa.capacidad}
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
            Crear
        </span>
    </button>
</form>
