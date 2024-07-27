<script>
    export let isOpen = false;
    export let title = "";
    export let onClose = () => {};
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full dark:bg-gray-800"
        >
            <div class="px-4 py-5 sm:px-6 dark:border-gray-700 dark:text-white">
                <h3
                    class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                    {title}
                </h3>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700">
                <div class="px-4 py-5 sm:px-6 dark:text-gray-300">
                    <slot></slot>
                </div>
            </div>
            <div
                class="px-4 py-3 bg-gray-50 text-right dark:bg-gray-700 dark:border-gray-600"
            >
                <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md dark:bg-blue-600 dark:hover:bg-blue-700"
                    on:click={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}
