<script>
    import { onMount } from "svelte";
    import { getMesas } from "../../services/mesasService";
    import { getRole, fetchUserRole } from "../../services/authService";

    let mesas = [];

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
            }
        } catch (err) {
            console.error("Error protecting route:", err);
            window.location.href = "/";
        }

        // Obtener los datos de las mesas
        mesas = await getMesas();
    });
    function seleccionarMesa(mesaId) {
        // Redirige a la página de pedidos con el ID de la mesa seleccionada
        // goto(`/mesero/pedidos/${mesaId}`);
        Window.location.href = "/mesero/pedidos/${mesaId}";
    }
</script>

<h1 class="text-3xl font-bold mb-6">Mesas</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
    {#each mesas as mesa}
        {#if mesa.estado === "disponible"}
            <a
                href={`/mesero/pedido/${mesa.id}`}
                class="block p-6 bg-slate-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Seleccionar mesa ${mesa.nombre}`}
            >
                <h2 class="text-xl font-semibold mb-2">Mesa {mesa.nombre}</h2>
                <p class="text-gray-200">Estado: {mesa.estado}</p>
                <p class="text-gray-200">Capacidad: {mesa.capacidad}</p>
            </a>
        {:else}
            <div
                class="p-6 bg-red-500 rounded-lg shadow-md"
                aria-label={`Mesa ${mesa.nombre} no disponible`}
            >
                <h2 class="text-xl font-semibold mb-2">Mesa {mesa.nombre}</h2>
                <p class="text-gray-100">Estado: {mesa.estado}</p>
                <p class="text-gray-100">Capacidad: {mesa.capacidad}</p>
            </div>
        {/if}
    {/each}
</div>

<!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each mesas as mesa}
        {#if mesa.estado === 'disponible'}
            <div class="p-6 bg-white rounded-lg shadow-md cursor-pointer" on:click={() => seleccionarMesa(mesa.id)}>
                <h2 class="text-xl font-semibold mb-2">Mesa {mesa.nombre}</h2>
                <p class="text-gray-600">Estado: {mesa.estado}</p>
                <p class="text-gray-600">Capacidad: {mesa.capacidad}</p>
            </div>
        {/if}
    {/each}
</div> -->
