<script>
    import { onMount } from "svelte";
    import { getAllPedidos } from "../../../services/pedidosService";

    let pedidos = [];

    onMount(async () => {
        try {
            pedidos = await getAllPedidos();
        } catch (error) {
            console.error("Error al cargar los pedidos:", error);
        }
    });

    function calcularTotal(pedido) {
        return pedido.dishes
            .reduce(
                (total, dish) => total + dish.price * dish.pivot.quantity,
                0,
            )
            .toFixed(2);
    }
</script>

<h1 class="text-3xl font-bold mb-6">Todos los Pedidos</h1>

<div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >ID</th
                >
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >Mesa</th
                >
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >Estado</th
                >
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >Platos</th
                >
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >Total</th
                >
            </tr>
        </thead>
        <tbody
            class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700"
        >
            {#each pedidos as pedido}
                <tr>
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100"
                        >{pedido.id}</td
                    >
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                        >{pedido.mesa_id}</td
                    >
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                        >{pedido.estado}</td
                    >
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                    >
                        <ul>
                            {#each pedido.dishes as dish}
                                <li>
                                    {dish.name} - S/{dish.price} - Cantidad: {dish
                                        .pivot.quantity}
                                </li>
                            {/each}
                        </ul>
                    </td>
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                    >
                        S/{calcularTotal(pedido)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
