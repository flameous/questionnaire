(function() {
    function getURLParameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function getThemePreference() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }

    function toggleTheme() {
        applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
    }

    function initThemeToggle(buttonId) {
        applyTheme(getThemePreference());
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", toggleTheme);
        }
    }

    function showModal(modalId, inputId, url) {
        const input = document.getElementById(inputId);
        const modal = document.getElementById(modalId);
        if (!input || !modal) {
            return;
        }

        input.value = url;
        modal.classList.add("show");
    }

    function closeModal(modalId, copyButtonSelector) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        if (copyButtonSelector) {
            const copyButton = document.querySelector(copyButtonSelector);
            if (copyButton) {
                copyButton.classList.remove("copied");
                copyButton.textContent = "Copy link";
            }
        }
    }

    function copyInputValue(inputId, copyButtonSelector) {
        const input = document.getElementById(inputId);
        const copyButton = document.querySelector(copyButtonSelector);

        if (!input || !copyButton) {
            return;
        }

        function showCopiedState() {
            copyButton.classList.add("copied");
            copyButton.textContent = "Copied";

            window.setTimeout(function() {
                copyButton.classList.remove("copied");
                copyButton.textContent = "Copy link";
            }, 2000);
        }

        function fallbackCopy() {
            input.select();
            document.execCommand("copy");
            showCopiedState();
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(input.value).then(showCopiedState).catch(fallbackCopy);
            return;
        }

        fallbackCopy();
    }

    window.AppShared = {
        applyTheme,
        closeModal,
        copyInputValue,
        getThemePreference,
        getURLParameter,
        initThemeToggle,
        showModal,
        toggleTheme
    };
}());
