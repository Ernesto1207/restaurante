<script>
    import { onMount } from "svelte";
    import {
        createUser,
        getRole,
        fetchUserRole,
    } from "../../services/authService";
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

    let name = "";
    let email = "";
    let password = "";
    let role_id = "";

    let roles = [
        { id: 1, name: "Mesero" },
        { id: 2, name: "Cocina" },
    ];

    let error = "";
    let success = "";

    async function handleSubmit() {
        error = "";
        success = "";
        try {
            await createUser(name, email, password, role_id);
            success = "Usuario creado exitosamente";
        } catch (err) {
            error = err.message;
        }
    }
</script>

<h1 class="text-3xl pb-10 font-semibold">Creacion De Usuarios</h1>

<form on:submit|preventDefault={handleSubmit} class="">
    <div class="mb-5">
        <label
            for="nombre"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nombre</label
        >
        <input
            type="text"
            id="name"
            bind:value={name}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nombre"
            required
        />
    </div>
    <div class="mb-5">
        <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Correo</label
        >
        <input
            type="email"
            id="email"
            bind:value={email}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nombre@gmail.com"
            required
        />
    </div>
    <div class="mb-5">
        <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Contraseña</label
        >
        <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="************"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
        />
    </div>
    <label
        for="role"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Rol:</label
    >
    <select
        id="role"
        bind:value={role_id}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option value="" disabled selected>Seleccione un rol</option>
        {#each roles as role}
            <option value={role.id}>{role.name}</option>
        {/each}
    </select><br>
    <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Crear Usuario</button
    >
</form>

{#if error}
    <p style="color: red;">{error}</p>
{/if}

{#if success}
    <p style="color: green;">{success}</p>
{/if}
