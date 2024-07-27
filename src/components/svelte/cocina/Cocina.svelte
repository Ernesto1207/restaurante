<script>
    import Modal from "../Modal.svelte";
    import { onMount } from "svelte";
    import {
        protectRoute,
        getRole,
        fetchUserRole,
    } from "../../services/authService";
    import {
        getPedidos,
        actualizarEstadoPedido,
    } from "../../services/pedidosService";

    let pedidos = [];
    let pedidoSeleccionado = null;
    let isModalOpen = false;

    onMount(async () => {
        try {
            let role = getRole();
            if (!role) {
                role = await fetchUserRole();
            }
            if (role !== "cocina") {
                window.location.href = "/";
                return;
            }
            pedidos = (await getPedidos()) || [];
        } catch (err) {
            console.error("Error protecting route:", err);
            window.location.href = "/";
        }
        // pedidos = (await getPedidos()) || []; // Asegúrate de que sea un array
        // console.log("Pedidos:", pedidos);
    });

    function seleccionarPedido(pedido) {
        pedidoSeleccionado = pedido;
        isModalOpen = true;
    }

    async function marcarComoPreparado() {
        if (pedidoSeleccionado) {
            try {
                await actualizarEstadoPedido(
                    pedidoSeleccionado.id,
                    "preparacion",
                );
                pedidos = (await getPedidos()) || [];
                pedidoSeleccionado = null;
                isModalOpen = false;
            } catch (error) {
                console.error(
                    "Error al marcar el pedido como preparado:",
                    error,
                );
            }
        }
    }

    async function marcarComoCompletado() {
        if (pedidoSeleccionado) {
            try {
                await actualizarEstadoPedido(
                    pedidoSeleccionado.id,
                    "completado",
                );
                pedidos = (await getPedidos()) || [];
                pedidoSeleccionado = null;
                isModalOpen = false;
                window.location.href = "/cocina/";
            } catch (error) {
                console.error(
                    "Error al marcar el pedido como completado:",
                    error,
                );
            }
        }
    }
</script>

<h1 class="text-3xl font-bold mb-6">Pedidos Pendientes</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each pedidos as pedido (pedido.id)}
        {#if pedido.estado === "pendiente" || pedido.estado === "preparacion"}
            <button
                class="p-6 bg-red-600 rounded-lg shadow-md"
                on:click={() => seleccionarPedido(pedido)}
                aria-label={`Seleccionar pedido ${pedido.id}`}
            >
                <h2 class="text-xl font-semibold mb-2">Pedido #{pedido.id}</h2>
                <p class="text-gray-100">Mesa: {pedido.mesa_id}</p>
                <p class="text-gray-100">Estado: {pedido.estado}</p>
            </button>
        {/if}
    {/each}
</div>

<Modal
    isOpen={isModalOpen}
    title="Detalles del Pedido"
    onClose={() => (isModalOpen = false)}
>
    {#if pedidoSeleccionado}
        <div class="mt-6 p-4 rounded-lg shadow-md text-center">
            <h2 class="text-xl font-semibold mb-2">
                Detalles del Pedido #{pedidoSeleccionado.id}
            </h2>
            <ul>
                {#each pedidoSeleccionado.dishes || [] as plato}
                    <li>
                        {plato.name} - Cantidad: {plato.pivot
                            .quantity}
                    </li>
                {/each}
            </ul>
            {#if pedidoSeleccionado.estado === "pendiente"}
                <button
                    on:click={marcarComoPreparado}
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >Marcar como en Preparacion</button
                >
            {/if}
            {#if pedidoSeleccionado.estado === "preparacion"}
                <button
                    on:click={marcarComoCompletado}
                    class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                    >Marcar como Completado</button
                >
            {/if}
        </div>
    {/if}
</Modal>
