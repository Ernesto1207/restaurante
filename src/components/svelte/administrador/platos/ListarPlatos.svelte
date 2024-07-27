<script>
    import { onMount } from "svelte";
    import { getDishes, deleteDish } from "../../../services/dishService";
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

    let dishes = [];

    onMount(async () => {
        dishes = await getDishes();
    });

    async function handleDelete(id) {
        await deleteDish(id);
        dishes = dishes.filter((dish) => dish.id !== id);
    }

    function handleEdit(id) {
        window.location.href = `/administrador/platos/edit/${id}`;
    }
</script>

<h1>Platos del Día</h1>
{#each dishes as dish}
    <table
        class="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5"
    >
        <thead
            class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr class=" flex flex-col wrap">
                <th class="p-3 text-left">Nombre:</th>
                <th class="p-3 text-left">Precio:</th>
                <th class="p-3 text-left">Cantidad:</th>
                <th class="p-4 text-left h-1">Accion:</th>
            </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none text-center">
            <tr
                class="flex flex-col wrap bg-white dark:bg-gray-800 dark:border-gray-700"
            >
                <td class=" hover:bg-gray-100 p-3">{dish.name}</td>
                <td class=" hover:bg-gray-100 p-3">{dish.price}</td>
                <td class=" hover:bg-gray-100 p-3">{dish.quantity}</td>
                <td class=" hover:bg-gray-100 p-3">
                    <button
                        class="text-blue-900"
                        on:click={() => handleEdit(dish.id)}>Editar</button
                    >
                    -
                    <button
                        class="text-red-400"
                        on:click={() => handleDelete(dish.id)}
                        >Eliminar<button> </button></button
                    ></td
                >
            </tr>
        </tbody>
    </table>
{/each}
<button
    on:click={() => (window.location.href = "/administrador/platos/newplato")}
    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
    ><span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
        >Crear Nuevo Plato</span
    ></button
>
