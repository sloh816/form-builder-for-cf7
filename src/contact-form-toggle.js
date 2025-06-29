(function () {
    setTimeout(() => {
        const toggleSwitches = document.querySelectorAll(".indiga-toggle-switch");

        toggleSwitches.forEach((toggle) => {
            addFunctionToToggle(toggle);
        });

        const formFieldPreview = document.querySelector(".form-preview__fields");

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const toggle = node.querySelector(".indiga-toggle-switch");
                            if (toggle) {
                                addFunctionToToggle(toggle);
                            }
                        }
                    });
                }
            }
        });

        observer.observe(formFieldPreview, {
            childList: true,
            subtree: false, // Set to true if you want to watch nested children too
        });
    }, 500);

    function addFunctionToToggle(toggle) {
        const toggleButtonWrapper = toggle.querySelector(".indiga-toggle-switch-button-wrapper");
        toggleButtonWrapper.style.display = "flex";

        const radioButtons = toggle.querySelector(".wpcf7-form-control-wrap");
        radioButtons.style.display = "none";

        const toggleButton = toggleButtonWrapper.querySelector("button");

        toggleButton.addEventListener("click", () => {
            const isChecked = toggleButtonWrapper.getAttribute("data-checked") === "true";
            toggleButtonWrapper.setAttribute("data-checked", !isChecked);

            const toggleButtonLabel = toggle.querySelector(".indiga-toggle-button-label");
            if (!isChecked === true) {
                const firstRadio = radioButtons.querySelector('.first input[type="radio"]');
                firstRadio.checked = true;
                toggleButtonLabel.textContent = firstRadio.value;
            } else {
                const lastRadio = radioButtons.querySelector('.last input[type="radio"]');
                lastRadio.checked = true;
                toggleButtonLabel.textContent = lastRadio.value;
            }
        });
    }
})();
