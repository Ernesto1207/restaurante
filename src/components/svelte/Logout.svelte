<script>
    import { logout } from "../services/authService";

    async function handleLogout() {
        try {
            await logout();
            window.location.href = "/"; // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
</script>

<button
    on:click={handleLogout}
    class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 dark:hover:bg-blue-700"
>
    Logout
</button>
