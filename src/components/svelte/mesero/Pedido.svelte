<script>
    import { onMount } from "svelte";
    import { getMesa } from "../../services/mesasService";
    import { createPedido } from "../../services/pedidosService";
    import { getDishes } from "../../services/dishService";
    import {
        getRole,
        fetchUserRole,
        fetchUser,
    } from "../../services/authService";

    export let params; // Obteniendo los parámetros de la URL
    let mesaId = params.id;

    let mesa = {};
    let pedido = {
        mesa_id: mesaId,
        user_id: null,
        estado: "pendiente",
        dishes: [],
    };

    let platos = [];

    const estados = ["pendiente", "preparacion", "completado"];

    onMount(async () => {
        // Protección de ruta
        try {
            let role = getRole(); // Obtener el rol actual

            console.log("Role in Component (initial):", role);

            if (!role) {
                role = await fetchUserRole(); // Obtener el rol si es null
                console.log("Role in Component (fetched):", role);
            }
            if (role !== "mesero") {
                window.location.href = "/";
            } else {
                const user = await fetchUserRole();
                pedido.user_id = user.id; // Asigna el ID del usuario al pedido
            }
        } catch (err) {
            console.error("Error protecting route:", err);
            window.location.href = "/";
        }

        // Obtener los datos de la mesa y platos existentes
        mesa = await getMesa(mesaId);
        platos = await getDishes();
        const userId = fetchUser();
        pedido.user_id = userId;
    });

    function togglePlato(platoId, quantity) {
        const index = pedido.dishes.findIndex((dish) => dish.id === platoId);
        if (index === -1) {
            pedido.dishes.push({ id: platoId, quantity: quantity });
        } else {
            pedido.dishes[index].quantity = quantity;
        }
    }

    async function handleSubmit() {
        console.log(JSON.stringify(pedido));
        console.log("Pedido a enviar:", pedido);
        try {
            const response = await createPedido(pedido);
            console.log("Respuesta del servidor:", response);
            localStorage.removeItem("id");
            window.location.href = "/mesero/";
        } catch (error) {
            console.error("Error creando el pedido:", error);
        }
    }
</script>

<h1 class="text-3xl font-bold mb-6">Pedido para Mesa {mesa.nombre}</h1>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
        <label for="estado" class="block text-lg font-medium">Estado</label>
        <select
            bind:value={pedido.estado}
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            disabled
        >
            {#each estados as estado}
                <option value={estado}>{estado}</option>
            {/each}
        </select>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope="col" class="px-1 py-3">
                    <div class="flex items-center"></div>
                </th>
                <th scope="col" class="px-1 py-3">Nombre </th>
                <th scope="col" class="px-1 py-3"> Precio</th>
                <th scope="col" class="px-1 py-3"> Stok </th>
                <th scope="col" class="px-1 py-3"> Cantidad </th>
            </tr>
        </thead>
        {#each platos as plato}
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <td class="w-4 p-3">
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                id={`plato-${plato.id}`}
                                value={plato.id}
                                on:change={(e) =>
                                    togglePlato(
                                        plato.id,
                                        e.target.nextElementSibling.value,
                                    )}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />

                            <label for="checkbox-table-1" class="sr-only"
                                >checkbox</label
                            >
                        </div>
                    </td>
                    <th
                        scope="row"
                        class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <label for={`plato-${plato.id}`} class="">
                            {plato.name}
                        </label>
                    </th>
                    <td class="px-3 py-4"> S/{plato.price} </td>
                    <td class="px-3 py-4"> {plato.quantity} </td>
                    <td class="px-3 py-4">
                        <input
                            type="number"
                            min="1"
                            max={plato.quantity}
                            value="1"
                            class=" bg-transparent border-gray-100"
                            on:input={(e) =>
                                togglePlato(plato.id, e.target.value)}
                        />
                    </td>
                </tr>
            </tbody>
        {/each}
    </div>
    <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >Crear Pedido</button
    >
</form>
