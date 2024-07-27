<script>
    import { onMount } from "svelte";
    import { getMesas, deleteMesa } from "../../../services/mesasService";
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

    let mesas = [];

    onMount(async () => {
        mesas = await getMesas();
    });

    async function handleDelete(id) {
        await deleteDish(id);
        dishes = dishes.filter((dish) => dish.id !== id);
    }

    function handleEdit(id) {
        window.location.href = `/administrador/mesas/edit/${id}`;
    }
</script>

<h1 class="text-3xl uppercase font-semibold pb-10">mesas</h1>
<!-- 
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope="col" class="px-6 py-3"> Product name </th>
                <th scope="col" class="px-6 py-3"> Color </th>
                <th scope="col" class="px-6 py-3"> Category </th>
                <th scope="col" class="px-6 py-3"> Action </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4"> Silver </td>
                <td class="px-6 py-4"> Laptop </td>
                <td class="px-6 py-4">
                    <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >Edit</a
                    >
                </td>
            </tr>
           
        </tbody>
    </table>
</div> -->
<!-- component -->

{#each mesas as mesa}
    <table
        class="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5"
    >
        <thead
            class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr
                class=" flex flex-col wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            >
                <th class="p-3 text-left">Numero:</th>
                <th class="p-3 text-left">Capacidad:</th>
                <th class="p-3 text-left">Estado:</th>
                <th class="p-4 text-left">Accion:</th>
            </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none text-center">
            <tr
                class="flex flex-col wrapbg-white dark:bg-gray-800 dark:border-gray-700"
            >
                <td class=" hover:bg-gray-100 p-3">{mesa.nombre}</td>
                <td class=" hover:bg-gray-100 p-3 truncate">{mesa.capacidad}</td
                >
                <td class=" hover:bg-gray-100 p-3 truncate">{mesa.estado}</td>
                <td
                    class=" hover:bg-gray-100 p-3 hover:text-red-600 hover:font-medium cursor-pointer"
                    ><button
                        class="text-blue-400"
                        on:click={() => handleEdit(mesa.id)}>Editar</button
                    >
                    -
                    <button
                        class="text-red-400"
                        on:click={() => handleDelete(mesa.id)}>Eliminar</button
                    ></td
                >
            </tr>
        </tbody>
    </table>
{/each}

<button
    on:click={() => (window.location.href = "/administrador/mesas/newmesa")}
    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
>
    <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
    >
    Crear Nueva Mesa
    </span>
</button>

